// ESM
import { Validator } from "@seriousme/openapi-schema-validator";

console.log(Validator.supportedVersions.has("3.1"));
// prints true

const validator = new Validator();
await validator.addSpecRef(
    "../components/schemas/requests/RegisterUserRequest.yaml", 
    "../components/schemas/responses/UserInfoResponse.yaml",
    "../components/schemas/responses/ErrorResponse.yaml",
    "../components/schemas/requests/LoginUserRequest.yaml",
    "../components/schemas/responses/LoginUserResponse.yaml",
    "../components/schemas/responses/RefreshTokenResponse.yaml",
    "../components/schemas/responses/UserInfoResponse.yaml"
);
const res = await validator.validate("../openapi.yaml");

const specification = validator.specification;
// specification now contains a Javascript object containing the specification
if (res.valid) {
  console.log("Specification matches schema for version", validator.version);
  const schema = validator.resolveRefs();
  // schema now contains a Javascript object containing the dereferenced schema
} else {
  console.log("Specification does not match Schema");
  console.log(res.errors);
}