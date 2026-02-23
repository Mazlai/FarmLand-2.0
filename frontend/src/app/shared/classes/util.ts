export class Util {

  /**
   * Generate a random string identifier.
   * @returns A randomly generated string.
   */
  public static generateRandomStringId() {
    return Math.random().toString(36).substring(2);
  }

}
