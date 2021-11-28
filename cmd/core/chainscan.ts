export class ChainScan {
  constructor(
    private chainId: number,
  ) {}

  public init() {
    console.log(this.chainId);
  }
}
