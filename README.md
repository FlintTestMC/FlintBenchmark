# FlintBenchmark

A benchmark repository for testing Minecraft server implementations against vanilla behavior. It is mostly going to be focused on being able to test rust implementations of Minecraft servers, but can be used for any server implementation.

It will track vanilla servers like Paper, Purpur, Spigot, and Fabric as well to provide a baseline for comparison.

## Vanilla% Rankings

| Server  | Vanilla% |
|---------|----------|
| Vanilla | 100%     |
| Paper   | 100%     |
| Purpur  | 100%     |
| Spigot  | 100%     |
| Fabric  | 100%     |

## Methodology

The benchmarks are completed using the FlintCLI tool. It runs tests with setblock, and asserts that the block state matches vanilla behavior. Each server is tested multiple times to ensure accuracy, if you notice irregularities please open an issue in the FlintCLI repository.

## Contributing
Contributions to the benchmark suite are welcome! If you have additional tests or server implementations to add, please submit a pull request with your changes. Try to write 100% of tests for a block if the block is small enough. Larger blocks can be split into multiple PRs.

## Using FlintBenchmark for Your Server
FlintBenchmark is freely available for other FOSS projects to use for testing and developing their own Minecraft server implementations. The test suite can help you:

- Validate your server's behavior against vanilla Minecraft
- Identify compatibility issues during development
- Track your progress toward vanilla parity
- Ensure block mechanics work correctly

Feel free to integrate these tests into your development workflow, CI/CD pipeline, or use them as a reference for expected vanilla behavior.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. This means you are free to use, modify, and distribute the tests in this repository for any purpose, including developing and testing your own server implementations.

## Contact
For questions or suggestions, please open an issue in this repository.

## Disclaimer
This benchmark is not affiliated with or endorsed by Mojang Studios or Microsoft. It is an independent project created by the Minecraft community.


