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

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or suggestions, please open an issue in this repository.

## Disclaimer
This benchmark is not affiliated with or endorsed by Mojang Studios or Microsoft. It is an independent project created by the Minecraft community.


