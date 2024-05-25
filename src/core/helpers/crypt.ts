import bcrypt from 'bcryptjs';

export class Crypt {
  static async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10); //el 10 indica un nivel de complejidad  de cifrado
  }

  static async compare(
    textOriginal: string,
    textHashed: string,
  ): Promise<boolean> {
    return await bcrypt.compare(textOriginal, textHashed);
  }
}
