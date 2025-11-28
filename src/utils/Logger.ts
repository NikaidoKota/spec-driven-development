/**
 * ロガークラス
 * デバッグおよびエラー情報を出力する
 */
export class Logger {
  private static enabled = true;

  /**
   * ロガーの有効/無効を切り替える
   * @param enabled 有効にするかどうか
   */
  static setEnabled(enabled: boolean): void {
    Logger.enabled = enabled;
  }

  /**
   * 情報メッセージをログ出力する
   * @param message メッセージ
   * @param optionalParams 追加パラメータ
   */
  static info(message: string, ...optionalParams: unknown[]): void {
    if (!Logger.enabled) return;
    console.log(`[INFO] ${message}`, ...optionalParams);
  }

  /**
   * 警告メッセージをログ出力する
   * @param message メッセージ
   * @param optionalParams 追加パラメータ
   */
  static warn(message: string, ...optionalParams: unknown[]): void {
    if (!Logger.enabled) return;
    console.warn(`[WARN] ${message}`, ...optionalParams);
  }

  /**
   * エラーメッセージをログ出力する
   * @param message メッセージ
   * @param optionalParams 追加パラメータ
   */
  static error(message: string, ...optionalParams: unknown[]): void {
    if (!Logger.enabled) return;
    console.error(`[ERROR] ${message}`, ...optionalParams);
  }
}
