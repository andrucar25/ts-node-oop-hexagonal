import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as docker from "@pulumi/docker";
import { Constants } from "./constants";

export const ecr = new aws.ecr.Repository(`${Constants.resourceBaseName}-ecr`, {
  name: `${Constants.resourceBaseName}-ecr`,
});

const registryInfo = ecr.registryId.apply(async (id) => {
  const credentials = await aws.ecr.getCredentials({ registryId: id });

  const [username, password] = Buffer.from(
    credentials.authorizationToken,
    "base64"
  )
    .toString()
    .split(":");

  if (!username || !password) throw new Error("Invalid credentials");

  return {
    server: credentials.proxyEndpoint,
    username,
    password,
  };
});

export const imageName = pulumi.interpolate`${ecr.repositoryUrl}:${new Date()
  .getTime()
  .toString()}`;
  
export const image = new docker.Image(`${Constants.resourceBaseName}-image`, {
  build: {
    context: "../",
  },
  imageName,
  registry: registryInfo,
});