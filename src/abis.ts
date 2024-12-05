export const abi = [
    {
      type: 'function',
      name: 'fetchUserBalance',
      stateMutability: 'view',
      inputs: [{
        internalType: 'address',
        name: '_user',
        type: 'address'
      }],
      outputs: [{
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }],
    },
    {
        type: 'function',
        name: 'createAutomatedSavingsPlan',
        stateMutability: 'nonpayable',
        inputs: [{
        internalType: 'address',
        name: '_token',
        type: 'address'
        }, {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
        }, {
        internalType: 'uint256',
        name: '_frequency',
        type: 'uint256'
        }, {
        internalType: 'uint256',
        name: '_duration',
        type: 'uint256'
        }],
        outputs: [],
    },
    
] as const