import { ethers, Contract } from 'ethers'
import PredictionMarket from './contracts/PredictionMarket.json';


const getBlockchain = () => 
	new Promise((resolve, reject) => {
		window.addEventListener('load', async () => {
			if(window.ethereum){
				await window.ethereum.enable();
				const provider = new ethers.providers.Web3Provider(window.ethereum)
				// const provider =  window['ethereum'] || window.web3.currentProvider;
                console.log(provider);
                const signer = provider.getSigner();
                console.log(signer);
				const signerAddress = await signer.getAddress();

				const predictionMarket = new Contract(
					PredictionMarket.networks[window.ethereum.networkVersion].address,
                    PredictionMarket.abi,
                    signer
                );

                resolve({signerAddress, predictionMarket});
            }
        })
    });

export default getBlockchain;