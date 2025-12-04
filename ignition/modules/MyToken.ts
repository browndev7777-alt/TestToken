import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyTokenModule", (m) => {
  const initialSupply = 1_000_000n; // 1M tokens

  const myToken = m.contract("MyToken", [initialSupply]);

  return { myToken };
});
