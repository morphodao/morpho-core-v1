-include .env.local

export FOUNDRY_ETH_RPC_URL=https://${NETWORK}.g.alchemy.com/v2/${ALCHEMY_KEY}
export FOUNDRY_FORK_BLOCK_NUMBER=14292587
export DAPP_REMAPPINGS=@config/=config/$(NETWORK)

test-compound: node_modules
	@echo Run all tests on ${NETWORK}
	@forge test -vv -c test/test-foundry/compound --no-match-contract TestGasConsumption --no-match-test testFuzz

fuzz-compound: node_modules
	@echo Run all fuzzing tests on ${NETWORK}
	@forge test -vv -c test/test-foundry/compound --match-test testFuzz

common:
	@echo Run all common tests
	@forge test -vvv -c test/test-foundry/common

contract-% c-%: node_modules
	@echo Run tests for contract $* on ${NETWORK}
	@forge test -vvv -c test/test-foundry/compound --match-contract $*

single-% s-%: node_modules
	@echo Run single test $* on ${NETWORK}
	@forge test -vvvvv -c test/test-foundry/compound --match-test $* > trace.ansi

.PHONY: config
config:
	forge config

node_modules:
	@yarn
