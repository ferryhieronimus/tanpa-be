import crypto from "crypto";

const generateSessionToken = (): string => {
  const bytes = crypto.randomBytes(43);
  return bytes.toString("hex");
};

export default generateSessionToken;
