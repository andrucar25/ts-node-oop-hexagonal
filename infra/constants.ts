import * as pulumi from '@pulumi/pulumi';

export class Constants {
  private static config: Record<string, pulumi.Config> = {};

  private static getConfig(prefix: string): pulumi.Config {
    if(!this.config[prefix]){
        this.config[prefix] = new pulumi.Config(prefix);
    }
    return this.config[prefix]
  }

  static get stack() {
    return pulumi.getStack()
  }

  static get project() {
    return pulumi.getProject()
  }

  static get resourceBaseName() {
    return `${pulumi.getStack()}-${pulumi.getProject()}`;
  }
}