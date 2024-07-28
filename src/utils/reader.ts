import { parseCSV } from './parseCSV';
import { stringify } from './stringify';
import { structChart } from './Chart';
import { structInfoData, structLineData } from './structInfo';
import md5 from 'md5';
// @ts-expect-error: vite-plugin-worker-loader
import Zip from '@/zip.worker?worker';

export var file2= undefined as unknown as File;

export class FileEmitter extends EventTarget {
  private readonly input: HTMLInputElement;

  // // 假设这个函数返回一个文件的URL  
  // private async fetchFileFromPath(filePath: string): Promise<Blob> {
  //   const response = await fetch(filePath);
  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch file: ${filePath}`);
  //   }
  //   return response.blob();
  // }

  // 触发文件加载的事件  
  private fireFileLoaded(files: File): boolean {
    return this.dispatchEvent(Object.assign(new Event('load'), { files }));
  }

  // 构造函数和其他代码...  
  public constructor() {
    super();
    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.accept = '';
    this.input.multiple = true;

    // 原始 onchange 事件处理器  
    this.input.onchange = () => {
      this.fireChange(this.input.files);
      for (const file of this.input.files || []) {
        // 加载文件
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onprogress = evt => this.fireProgress(evt.loaded, evt.total);
        reader.onload = evt => evt.target && evt.target.result instanceof ArrayBuffer && this.fireLoad(file, evt.target.result);
      }

      // // 假设您有一个方法来从某个地方调用以模拟文件选择  
      // this.simulateFileSelection = async (filePath: string) => {
      //   try {
      //     // 从URL加载文件  
      //     const blob = await this.fetchFileFromPath(filePath);
      //     // 将Blob转换为File对象（如果需要，可以添加文件名和其他属性）  
      //     const file = new File([blob], 'downloaded_file.zip', { type: 'application/zip' });
      //     // 创建一个文件列表（因为我们可能一次只处理一个文件）  
      //     const files = [file];

      //     // 触发自定义的 change 事件，或者您可以直接调用后续的处理函数  
      //     this.fireFileLoaded(files);

      //     // 如果您希望这些文件也出现在 input 元素的 files 列表中（通常不推荐，因为用户未实际选择它们）  
      //     // 注意：这通常不是标准行为，并且可能因浏览器而异  
      //     // Object.defineProperty(this.input, 'files', {  
      //     //   value: FileList.from(files),  
      //     //   writable: false,  
      //     //   enumerable: true  
      //     // }); // 注意：FileList.from 不是标准API，这里只是示意  

      //     // 由于我们不能直接修改 input.files，我们通常不这样做，而是使用自定义事件或直接调用处理函数  
      //   } catch (error) {
      //     console.error('Error loading file:', error);
      //   }
      // };
    }
  }

  public uploadFile(): void {
    this.input.webkitdirectory = false;
    this.input.click();
  }
  public uploadDir(): void {
    this.input.webkitdirectory = true;
    this.input.click();
  }
  public fireChange(files: FileList | null): boolean {
    return this.dispatchEvent(Object.assign(new Event('change'), { files }));
  }
  public fireProgress(loaded: number, total: number): boolean {
    return this.dispatchEvent(new ProgressEvent('progress', { lengthComputable: true, loaded, total }));
  }
  public fireLoad(file: Pick<File, 'name'>, buffer: ArrayBuffer): boolean {
    return this.dispatchEvent(Object.assign(new ProgressEvent('load'), { file, buffer }));
  }

  public async simulateFileSelection(filePath: string): Promise<void> {  
    try {  
      // 从 URL 加载文件  
      const blob = await this.fetchFileFromPath(filePath);  
      // 将 Blob 转换为 File 对象  
      const file = new File([blob], filePath, { type: 'application/zip' });  
      // 触发自定义的 change 事件，或调用处理函数  
      file2=file
      this.fireFileLoaded(file);  
    } catch (error) {  
      console.error('Error loading file:', error);  
    }  
  }  
  
  // 私有方法，用于从 URL 加载 Blob  
  private async fetchFileFromPath(filePath: string): Promise<Blob> {  
    const response = await fetch(filePath);  
    if (!response.ok) {  
      throw new Error(`Failed to fetch file: ${filePath}`);  
    }  
    return response.blob();  
  }  

  // 注意：上面的 simulateFileSelection 方法签名与构造函数内的私有方法冲突，我已在构造函数内的方法前添加了 `this.` 前缀以区分它们  
  // 但实际上，您可能希望将构造函数内的私有方法重命名为其他名称，以避免混淆  
}

// 注意：我修改了 simulateFileSelection 方法的签名，以使其与构造函数内的私有方法不同。  
// 在实际应用中，您可能希望将私有方法重命名为不同的名称，以避免潜在的命名冲突。


export class ZipReader extends EventTarget {
  public total: number;
  private worker: Worker | null;
  private readonly handler: (data: ByteData) => Promise<unknown>;
  public constructor({ handler = async data => Promise.resolve(data) }: ReaderOptions) {
    super();
    this.worker = null;
    this.total = 0;
    this.handler = handler;
  }
  public read(zipData: ByteData): void {
    if (!this.worker) {
      this.dispatchEvent(new CustomEvent('loadstart'));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const worker = new Zip() as Worker; // 以后考虑indexedDB存储url
      worker.addEventListener('message', msg => {
        const handler = async () => {
          const { data } = msg as { data: { data: ByteData; total: number } };
          this.total = data.total;
          const result = await this.handler(data.data);
          this.dispatchEvent(new CustomEvent('read', { detail: result }));
        };
        handler().catch((e: unknown) => this.dispatchEvent(new CustomEvent('error', { detail: e })));
      });
      this.worker = worker;
    }
    this.worker.postMessage(zipData, [zipData.buffer]);
  }
  public terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
interface ReaderInit {
  pattern: RegExp;
  /** binary(not text)/text(not json)/json */
  type?: 'binary' | 'json' | 'text';
  mustMatch?: boolean;
  weight?: number;
  read: (data: ByteData, options?: Record<string, unknown>) => Promise<ReaderData | null> | ReaderData | null;
}
function defineReader(readerInit: ReaderInit): ByteReader {
  const { pattern, type = 'binary', mustMatch = false, weight = 0, read } = readerInit;
  const reader = { pattern, type, mustMatch, weight, read };
  if (type === 'text') {
    reader.read = async (i: ByteData) => {
      if (i.isText == null) {
        try {
          i.text = stringify(i.buffer);
          i.isText = true;
        } catch (error) {
          i.isText = false;
        }
      }
      return i.isText ? read(i) : null;
    };
  }
  if (type === 'json') {
    reader.read = async (i: ByteData) => {
      if (i.isText == null) {
        try {
          i.text = stringify(i.buffer);
          i.isText = true;
        } catch (error) {
          i.isText = false;
        }
      }
      if (i.isJSON == null) {
        try {
          i.data = JSON.parse(i.text!);
          i.isJSON = true;
        } catch (error) {
          i.isJSON = false;
        }
      }
      return i.isJSON ? read(i) : null;
    };
  }
  return reader;
}
const readerInits: ReaderInit[] = [
  {
    pattern: /\.(mp3|ogg|wav|mp4|webm|ogv|mpg|mpeg|avi|mov|flv|wmv|mkv)$/i,
    async read(i: ByteData, { createAudioBuffer }: Record<string, unknown> = {}): Promise<MediaReaderData> {
      return readMediaData(i, async (arraybuffer: ArrayBuffer) => {
        if (typeof createAudioBuffer === 'function') return createAudioBuffer(arraybuffer) as AudioBuffer;
        return defaultDecode(arraybuffer);
      });
    }
  }, {
    pattern: /\.json$/i,
    type: 'json',
    read(i: ByteData): ChartReaderData {
      const text = i.text!;
      const json = JSON.parse(text, (_, value) => typeof value === 'number' ? Math.fround(value) : value as unknown) as ChartPGS;
      const { data: jsonData, messages } = structChart(json, i.pathname);
      const format = `PGS(${jsonData.formatVersion})`;
      return { pathname: i.pathname, type: 'chart', md5: md5(text), data: jsonData, msg: messages, format };
    }
  }, {
    pattern: /\.(png|jpg|jpeg|gif|bmp|webp|svg)$/i,
    async read(i: ByteData): Promise<ImageReaderData> {
      const data = new Blob([i.buffer]);
      const imageData = await createImageBitmap(data);
      return { pathname: i.pathname, type: 'image', data: imageData };
    }
  }, {
    pattern: /^line\.csv$/i,
    type: 'text',
    mustMatch: true,
    read(i: ByteData): ChartLineReaderData {
      const { path } = splitPath(i.pathname);
      const data = i.text!;
      const chartLine = structLineData(parseCSV(data, true), path);
      return { pathname: i.pathname, type: 'line', data: chartLine };
    }
  }, {
    pattern: /^info\.csv$/i,
    type: 'text',
    mustMatch: true,
    read(i: ByteData): ChartInfoReaderData {
      const { path } = splitPath(i.pathname);
      const data = i.text!;
      const chartInfo = structInfoData(parseCSV(data, true), path);
      return { pathname: i.pathname, type: 'info', data: chartInfo };
    }
  }
];
async function defaultDecode(arraybuffer: ArrayBuffer) {
  const actx: AudioContext = new self.AudioContext();
  await actx.close();
  // return actx.decodeAudioData(arraybuffer);
  return new Promise((resolve: (value: AudioBuffer) => void, reject) => {
    const a = actx.decodeAudioData(arraybuffer, resolve, reject);
    if (a instanceof Promise) a.then(resolve, reject);
  }).catch((e: unknown) => {
    if (e instanceof Error) throw e;
    throw new DOMException('Unable to decode audio data', 'EncodingError');
  });
}
function createReader(define: ((readerInit: ReaderInit) => ByteReader)) {
  const readers = readerInits.map(define);
  return {
    async read(i: ByteData, options = {}): Promise<ReaderData> {
      const { name } = splitPath(i.pathname);
      const filtered = readers.filter(a => a.pattern.test(name) || !a.mustMatch);
      filtered.sort((a, b) => {
        if (a.pattern.test(name) && !b.pattern.test(name)) return -1;
        if (!a.pattern.test(name) && b.pattern.test(name)) return 1;
        if (a.weight > b.weight) return -1;
        if (a.weight < b.weight) return 1;
        return 0;
      });
      const errors = [] as Error[];
      const errorHandler = (reader: ByteReader, err: Error) => {
        if (reader.pattern.test(name)) errors.push(err);
      };
      for (const reader of filtered) {
        try {
          const data = await reader.read(i, options);
          if (data) return data;
        } catch (err) {
          errorHandler(reader, err as Error);
        }
      }
      return { pathname: i.pathname, type: 'unknown', data: errors.join('\n') }; // TODO: 完善错误信息
    },
    use(readerInit: ReaderInit | ReaderInit[]) {
      if (Array.isArray(readerInit)) {
        for (const reader of readerInit) this.use(reader);
      } else {
        readers.push(define(readerInit));
      }
    }
  } as const;
}
export const reader = createReader(defineReader);
export function splitPath(i: string): { name: string; path: string } {
  const j = i.lastIndexOf('/');
  const name = i.slice(j + 1);
  const path = ~j ? i.slice(0, j) : '';
  return { name, path };
}
async function readMediaData(i: ByteData, createAudioBuffer: (arraybuffer: ArrayBuffer) => Promise<AudioBuffer>) {
  const videoElement = document.createElement('video');
  await new Promise(resolve => {
    videoElement.src = URL.createObjectURL(new Blob([i.buffer]));
    videoElement.preload = 'metadata';
    videoElement.onloadedmetadata = resolve;
    videoElement.onerror = resolve;
  });
  return {
    pathname: i.pathname,
    type: 'media',
    data: {
      audio: await createAudioBuffer(i.buffer.slice(0)),
      video: videoElement.videoWidth && videoElement.videoHeight ? videoElement : null
    }
  } as MediaReaderData;
}
