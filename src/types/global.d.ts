export {};

declare global {

  interface Step {
    type: 'name' | 'email' | 'password';
    index: number;
    buttons: string[];
  }

}