import { setSetting, rmSetting, isOfficeInited,activeview } from "@/office";
// Html交互(WIP)
export class StatusManager {
  private readonly key: string;
  private data: Record<string, string>;
  public constructor(key: string) {
    this.key = key;
    this.data = {};
  }
  public init(resetCallback: (data: Record<string, string>) => string): this {
    try {
      var dataOffice = Office.context.document.settings.get(this.key)
    }
    catch (e) {
      var dataOffice = undefined
    }
    if (dataOffice != undefined) {
      this.data = JSON.parse(dataOffice ?? '{}') as Record<string, string>
    }
    else {
      this.data = JSON.parse(localStorage.getItem(this.key) ?? '{}') as Record<string, string>
    };
    if (typeof resetCallback === 'function') {
      if (resetCallback(this.data)) this.reset();
    }
    return this;
  }
  public save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.data));
    if (isOfficeInited == 1 && activeview == 0) {
      setSetting(this.key, JSON.stringify(this.data));
    }
  }
  public reset(): void {
    this.data = {};
    this.save();
    if (isOfficeInited == 1 && activeview == 0) {
      rmSetting(true, "0")
    }
  }
  public get(key: string): string | undefined {
    return this.data[key];
  }
  public set(key: string, value: string): void {
    this.data[key] = value;
    this.save();
  }
  public reg(key: string, node: HTMLElement, dispatch: unknown = true): void {
    if (node instanceof HTMLInputElement || node instanceof HTMLSelectElement) {
      const property = node.type === 'checkbox' ? 'checked' : 'value';
      const value = this.get(key);
      if (value !== undefined) ((node as HTMLInputElement)[property] as string) = value;
      node.addEventListener('change', () => {
        this.set(key, (node as HTMLInputElement)[property] as string);
      });
      if (dispatch as boolean) node.dispatchEvent(new Event('change'));
    } else if (node instanceof HTMLTextAreaElement) {
      const value = this.get(key);
      if (value !== undefined) (node.value as unknown) = value;
      node.addEventListener('change', () => {
        this.set(key, node.value);
      });
      if (dispatch as boolean) node.dispatchEvent(new Event('change'));
    } else throw new Error('Node must be <input>, <select> or <textarea>');
  }
}
