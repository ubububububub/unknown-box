import crypto from "crypto";

const hashPassword = password => {
  return crypto.createHash("sha512").update(password).digest("hex");
};

export { hashPassword };
