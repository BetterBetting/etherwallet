'use strict';
var decryptWalletCtrl = function($scope, $sce, walletService, $rootScope) {
    $scope.nodeList = nodes.nodeList;
    $scope.walletType = globalFuncs.localStorage.getItem('walletType') || "";
    $scope.txId = 1;
    $scope.requireFPass = $scope.requirePPass = $scope.showFDecrypt = $scope.showPDecrypt = $scope.showAOnly = $scope.showParityDecrypt = false;
    $scope.filePassword = "";
    $scope.fileContent = "";
    $scope.Validator = Validator;
    $scope.isSSL = window.location.protocol == 'https:';
    $scope.ajaxReq = ajaxReq;
    $scope.nodeType = $scope.ajaxReq.type;
    $scope.address = null;
    $scope.HDWallet = {
        numWallets: 0,
        walletsPerDialog: 5,
        wallets: [],
        id: 0,
        hdk: null,
        dPath: '',
        defaultDPath:      "m/44'/60'/0'/0",       // first address: m/44'/60'/0'/0/0
        alternativeDPath:  "m/44'/60'/0'",         // first address: m/44'/60'/0/0
        customDPath:       "m/44'/60'/1'/0",       // first address: m/44'/60'/1'/0/0
        ledgerPath:        "m/44'/60'/0'",         // first address: m/44'/60'/0/0
        ledgerClassicPath: "m/44'/60'/160720'/0'", // first address: m/44'/60'/160720'/0/0
        trezorTestnetPath: "m/44'/1'/0'/0",        // first address: m/44'/1'/0'/0/0
        trezorClassicPath: "m/44'/61'/0'/0",       // first address: m/44'/61'/0'/0/0
        trezorPath:        "m/44'/60'/0'/0",       // first address: m/44'/60'/0'/0/0
        hwUbqPath:         "m/44'/108'/0'/0",      // first address: m/44'/40'/0'/0/0
        hwExpansePath:     "m/44'/40'/0'/0",       // first address: m/44'/40'/0'/0/0
        hwEllaismPath:     "m/44'/163'/0'/0",      // first address: m/44'/163'/0'/0/0
        hwEtherGemPath:    "m/44'/1987'/0'/0",     // first address: m/44'/1987'/0'/0/0
        hwCallistoPath:    "m/44'/820'/0'/0",      // first address: m/44'/820'/0'/0/0
        hwSocialPath:      "m/44'/1128'/0'/0",     // first address: m/44'/1128'/0'/0/0
        hwMusicoinPath:    "m/44'/184'/0'/0",      // first address: m/44'/184'/0'/0/0
        hwYapstonePath:    "m/44'/528'/0'/0",      // first address: m/44'/528'/0'/0/0
        singularDTVPath:   "m/0'/0'/0'",           // first address: m/0'/0'/0'/0
        hwRskPath:         "m/44'/137'/0'/0",      // first address : m/44'/137'/0'/0/0
        goPath:            "m/44'/6060'/0'/0",     // first address: m/44'/6060'/0'/0/0
        hwEOSClassicPath:  "m/44'/2018'/0'/0",     // first address: m/44'/2018'/0'/0/0
    };
    $scope.HDWallet.dPath = $scope.HDWallet.defaultDPath;
    $scope.mnemonicModel = new Modal(document.getElementById('mnemonicModel'));
    $scope.$watch('ajaxReq.type', function() {
        $scope.nodeType = $scope.ajaxReq.type;
        $scope.setdPath();
    });
    $scope.$watch('walletType', function() {
        globalFuncs.localStorage.setItem('walletType', $scope.walletType);
        $scope.setdPath();
    });
    $scope.setdPath = function() {
        if ($scope.walletType == "ledger") {
            switch ($scope.nodeType) {
                case nodes.nodeTypes.ETH:
                    $scope.HDWallet.dPath = $scope.HDWallet.ledgerPath;
                    break;
                case nodes.nodeTypes.ETC:
                    $scope.HDWallet.dPath = $scope.HDWallet.ledgerClassicPath;
                    break;
                case nodes.nodeTypes.EXP:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwExpansePath;
                    break;
                case nodes.nodeTypes.UBQ:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwUbqPath;
                    break;
                default:
                    $scope.HDWallet.dPath = $scope.HDWallet.ledgerPath;
            }
        } else if ($scope.walletType == "trezor") {
            switch ($scope.nodeType) {
                case nodes.nodeTypes.ETH:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorPath;
                    break;
                case nodes.nodeTypes.ETC:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorClassicPath;
                    break;
                case nodes.nodeTypes.Ropsten:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorTestnetPath;
                    break;
                case nodes.nodeTypes.Rinkeby:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorTestnetPath;
                    break;
                case nodes.nodeTypes.Kovan:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorTestnetPath;
                    break;
                case nodes.nodeTypes.EXP:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwExpansePath;
                    break;
                case nodes.nodeTypes.UBQ:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwUbqPath;
                    break;
                case nodes.nodeTypes.RSK:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwRskPath;
                    break;
                case nodes.nodeTypes.ELLA:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwEllaismPath;
                    break;
                case nodes.nodeTypes.EGEM:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwEtherGemPath;
                    break;
                case nodes.nodeTypes.CLO:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwCallistoPath;
                    break;
                case nodes.nodeTypes.ETSC:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwSocialPath;
                    break;
                case nodes.nodeTypes.MUSIC:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwMusicoinPath;
                    break;
                case nodes.nodeTypes.YAP:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwYapstonePath;
                    break;
                case nodes.nodeTypes.GO:
                    $scope.HDWallet.dPath = $scope.HDWallet.goPath;
                    break;
                case nodes.nodeTypes.EOSC:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwEOSClassicPath;
                    break;
                default:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorPath;
            }
        } else {
          switch ($scope.nodeType) {
                case nodes.nodeTypes.ETH:
                    $scope.HDWallet.dPath = $scope.HDWallet.defaultDPath;
                    break;
                case nodes.nodeTypes.ETC:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorClassicPath;
                    break;
                case nodes.nodeTypes.Ropsten:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorTestnetPath;
                    break;
                case nodes.nodeTypes.Rinkeby:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorTestnetPath;
                    break;
                case nodes.nodeTypes.Kovan:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorTestnetPath;
                    break;
                case nodes.nodeTypes.EXP:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwExpansePath;
                    break;
                case nodes.nodeTypes.UBQ:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwUbqPath;
                    break;
                case nodes.nodeTypes.CLO:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwCallistoPath;
                    break;
                case nodes.nodeTypes.ETSC:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwSocialPath;
                    break;
                case nodes.nodeTypes.MUSIC:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwMusicoinPath;
                    break;
                case nodes.nodeTypes.YAP:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwYapstonePath;
                    break;
                case nodes.nodeTypes.GO:
                    $scope.HDWallet.dPath = $scope.HDWallet.goPath;
                    break;
                case nodes.nodeTypes.EOSC:
                    $scope.HDWallet.dPath = $scope.HDWallet.hwEOSClassicPath;
                    break;
                default:
                  $scope.HDWallet.dPath = $scope.HDWallet.defaultDPath;
            }
        }
    }
    $scope.onHDDPathChange = function(password = $scope.mnemonicPassword) {
        $scope.HDWallet.numWallets = 0;
        if ($scope.walletType == 'pastemnemonic') {
            $scope.HDWallet.hdk = hd.HDKey.fromMasterSeed(hd.bip39.mnemonicToSeed($scope.manualmnemonic.trim(), password));
            $scope.setHDAddresses($scope.HDWallet.numWallets, $scope.HDWallet.walletsPerDialog);
        } else if ($scope.walletType == 'ledger') {
            $scope.scanLedger();
        } else if ($scope.walletType == 'trezor') {
            $scope.scanTrezor();
        } else if ($scope.walletType == 'digitalBitbox') {
            $scope.scanDigitalBitbox();
        } else if ($scope.walletType == 'secalot') {
            $scope.scanSecalot();
        }
    }
    $scope.onCustomHDDPathChange = function() {
        $scope.HDWallet.dPath = $scope.HDWallet.customDPath;
        $scope.onHDDPathChange();
    }
    $scope.showContent = function($fileContent) {
        $scope.notifier.info(globalFuncs.successMsgs[4] + document.getElementById('fselector').files[0].name);
        try {
            $scope.requireFPass = Wallet.walletRequirePass($fileContent);
            $scope.showFDecrypt = !$scope.requireFPass;
            $scope.fileContent = $fileContent;
        } catch (e) {
            $scope.notifier.danger(e);
        }
    };
    $scope.openFileDialog = function($fileContent) {
        $scope.showAOnly = false;
        document.getElementById('fselector').click();
    };
    $scope.onFilePassChange = function() {
        $scope.showAOnly = false;
        $scope.showFDecrypt = $scope.filePassword.length >= 0;
    };
    $scope.onPrivKeyChange = function() {
        $scope.showAOnly = false;
        const manualprivkey = fixPkey($scope.manualprivkey);

        $scope.requirePPass = manualprivkey.length == 128 || manualprivkey.length == 132;
        $scope.showPDecrypt = manualprivkey.length == 64;
    };
    $scope.onPrivKeyPassChange = function() {
        $scope.showAOnly = false;
        $scope.showPDecrypt = $scope.privPassword.length > 0;
    };
    $scope.onMnemonicChange = function() {
        $scope.showAOnly = false;
        $scope.showMDecrypt = hd.bip39.validateMnemonic($scope.manualmnemonic);
    };
    $scope.onParityPhraseChange = function() {
        if ($scope.parityPhrase) $scope.showParityDecrypt = true;
        else $scope.showParityDecrypt = false;
    };
    $scope.onAddressChange = function() {
        $scope.requireFPass = $scope.requirePPass = $scope.showFDecrypt = $scope.showPDecrypt = $scope.showParityDecrypt = false;
        $scope.showAOnly = $scope.Validator.isValidAddress($scope.addressOnly);
    };
    $scope.setHDAddresses = function(start, limit) {
        $scope.HDWallet.wallets = [];
        for (var i = start; i < start + limit; i++) {
            $scope.HDWallet.wallets.push(new Wallet($scope.HDWallet.hdk.derive($scope.HDWallet.dPath + "/" + i)._privateKey));
            $scope.HDWallet.wallets[$scope.HDWallet.wallets.length - 1].setBalance(false);
        }
        $scope.HDWallet.id = 0;
        $scope.HDWallet.numWallets = start + limit;
    }
    $scope.setHDAddressesHWWallet = function(start, limit, ledger) {
        $scope.HDWallet.wallets = [];
        for (var i = start; i < start + limit; i++) {
            var derivedKey = $scope.HDWallet.hdk.derive("m/" + i);
            if ($scope.walletType == "ledger") {
                $scope.HDWallet.wallets.push(new Wallet(undefined, derivedKey.publicKey, $scope.HDWallet.dPath + "/" + i, $scope.walletType, $scope.ledger));
            } else if ($scope.walletType == "digitalBitbox") {
                $scope.HDWallet.wallets.push(new Wallet(undefined, derivedKey.publicKey, $scope.HDWallet.dPath + "/" + i, $scope.walletType, $scope.digitalBitbox));
            } else if ($scope.walletType == "secalot") {
                $scope.HDWallet.wallets.push(new Wallet(undefined, derivedKey.publicKey, $scope.HDWallet.dPath + "/" + i, $scope.walletType, $scope.secalot));
            } else {
                $scope.HDWallet.wallets.push(new Wallet(undefined, derivedKey.publicKey, $scope.HDWallet.dPath + "/" + i, $scope.walletType));
            }
            $scope.HDWallet.wallets[$scope.HDWallet.wallets.length - 1].type = "addressOnly";
            $scope.HDWallet.wallets[$scope.HDWallet.wallets.length - 1].setBalance(false);
        }
        $scope.HDWallet.id = 0;
        $scope.HDWallet.numWallets = start + limit;
    }
    $scope.AddRemoveHDAddresses = function(isAdd) {
        if ($scope.walletType == "ledger" || $scope.walletType == "trezor" || $scope.walletType == "digitalBitbox" || $scope.walletType == "secalot") {
            if (isAdd) $scope.setHDAddressesHWWallet($scope.HDWallet.numWallets, $scope.HDWallet.walletsPerDialog);
            else $scope.setHDAddressesHWWallet($scope.HDWallet.numWallets - 2 * $scope.HDWallet.walletsPerDialog, $scope.HDWallet.walletsPerDialog);
        } else {
            if (isAdd) $scope.setHDAddresses($scope.HDWallet.numWallets, $scope.HDWallet.walletsPerDialog);
            else $scope.setHDAddresses($scope.HDWallet.numWallets - 2 * $scope.HDWallet.walletsPerDialog, $scope.HDWallet.walletsPerDialog);
        }
    }
    $scope.setHDWallet = function() {
        walletService.wallet = $scope.wallet = $scope.HDWallet.wallets[$scope.HDWallet.id];
        $scope.mnemonicModel.close();
        $scope.notifier.info(globalFuncs.successMsgs[1]);
        $scope.wallet.type = "default";
    }
    $scope.decryptWallet = function() {
        $scope.wallet = null;
        try {
          if ($scope.showPDecrypt && $scope.requirePPass) {
            $scope.wallet = Wallet.fromMyEtherWalletKey($scope.manualprivkey, $scope.privPassword);
            walletService.password = $scope.privPassword;
          } else if ($scope.showPDecrypt && !$scope.requirePPass) {
              console.log(1)
            let privKey = $scope.manualprivkey.indexOf("0x") === 0 ? $scope.manualprivkey : "0x" + $scope.manualprivkey;

            if (!$scope.Validator.isValidHex($scope.manualprivkey)) {
              $scope.notifier.danger(globalFuncs.errorMsgs[37]);
              return;
            } else if(!ethUtil.isValidPrivate(ethUtil.toBuffer(privKey))) {
              $scope.wallet = null;
              $scope.notifier.danger(globalFuncs.errorMsgs[40]);
              return;
            } else {
              $scope.wallet = new Wallet(fixPkey($scope.manualprivkey));
              checkAndSetEscrow($scope.wallet.getAddressString());
              walletService.password = '';
            }
          } else if ($scope.showFDecrypt) {
            $scope.wallet = Wallet.getWalletFromPrivKeyFile($scope.fileContent, $scope.filePassword);
            walletService.password = $scope.filePassword;
          } else if ($scope.showMDecrypt) {
            $scope.mnemonicModel = new Modal(document.getElementById('mnemonicModel'));
            $scope.mnemonicModel.open();
            $scope.onHDDPathChange($scope.mnemonicPassword);
          }
          walletService.wallet = $scope.wallet;
          checkAndSetEscrow($scope.wallet.getAddressString());
        } catch (e) {
          $scope.notifier.danger(globalFuncs.errorMsgs[6] + e);
        }

        if ($scope.wallet !== null) {
          $scope.notifier.info(globalFuncs.successMsgs[1]);
          $scope.wallet.type = "default";
        }
    };
    $scope.decryptAddressOnly = function() {
        if ($scope.Validator.isValidAddress($scope.addressOnly)) {
            var tempWallet = new Wallet();
            $scope.wallet = {
                type: "addressOnly",
                address: $scope.addressOnly,
                getAddressString: function() {
                    return this.address;
                },
                getChecksumAddressString: function() {
                    return ethUtil.toChecksumAddress(this.getAddressString());
                },
                setBalance: tempWallet.setBalance,
                setTokens: tempWallet.setTokens
            }
            $scope.notifier.info(globalFuncs.successMsgs[1]);
            walletService.wallet = $scope.wallet;
        }
    }
    $scope.HWWalletCreate = function(publicKey, chainCode, walletType, path) {
        $scope.mnemonicModel = new Modal(document.getElementById('mnemonicModel'));
        $scope.mnemonicModel.open();
        $scope.HDWallet.hdk = new hd.HDKey();
        $scope.HDWallet.hdk.publicKey = new Buffer(publicKey, 'hex');
        $scope.HDWallet.hdk.chainCode = new Buffer(chainCode, 'hex');
        $scope.HDWallet.numWallets = 0;
        $scope.HDWallet.dPath = path;
        $scope.setHDAddressesHWWallet($scope.HDWallet.numWallets, $scope.HDWallet.walletsPerDialog, walletType);
        walletService.wallet = null;
    }
    $scope.ledgerCallback = function(result, error) {
        if (typeof result != "undefined") {
            $scope.HWWalletCreate(result['publicKey'], result['chainCode'], "ledger", $scope.getLedgerPath());
        }
        else {
            $scope.ledgerError = true;
            $scope.ledgerErrorString = error;
            $scope.$apply();
        }
    }
    $scope.trezorCallback = function(response) {
        if (response.success) {
            $scope.HWWalletCreate(response.publicKey, response.chainCode, "trezor", $scope.getTrezorPath());
        } else {
            $scope.trezorError = true;
            $scope.trezorErrorString = response.error;
            $scope.$apply();
        }
    }
    $scope.digitalBitboxCallback = function(result, error) {
        $scope.HDWallet.digitalBitboxSecret = '';
        if (typeof result != "undefined") {
            $scope.HWWalletCreate(result['publicKey'], result['chainCode'], "digitalBitbox", $scope.HDWallet.dPath);
        } else
            $scope.notifier.danger(error);
    }
    $scope.secalotCallback = function(result, error) {
        if (typeof result != "undefined") {
            $scope.HWWalletCreate(result['publicKey'], result['chainCode'], "secalot", $scope.HDWallet.dPath);
        } else
            $scope.notifier.danger(error);
    }
    $scope.scanLedger = function() {
        $scope.ledgerError = false;
        $scope.ledger = new Ledger3("w0w");
        var app = new ledgerEth($scope.ledger);
        var path = $scope.getLedgerPath();
        app.getAddress(path, $scope.ledgerCallback, false, true);
    };
    $scope.scanDigitalBitbox = function() {
        $scope.digitalBitbox = new DigitalBitboxUsb();
        var app = new DigitalBitboxEth($scope.digitalBitbox, $scope.HDWallet.digitalBitboxSecret);
        var path = $scope.HDWallet.dPath;
        app.getAddress(path, $scope.digitalBitboxCallback);
    };
    $scope.scanSecalot = function() {
        $scope.secalot = new SecalotUsb();
        if (typeof $scope.HDWallet.secalotSecret == "undefined") {
            $scope.HDWallet.secalotSecret = "";
        }
        var app = new SecalotEth($scope.secalot, $scope.HDWallet.secalotSecret);
        var path = $scope.HDWallet.dPath;
        app.getAddress(path, $scope.secalotCallback);
    };
    $scope.scanTrezor = function() {
        // trezor is using the path without change level id
        var path = $scope.getTrezorPath();

        console.warn("SCANTR", path, $scope.HDWallet)
        TrezorConnect.getXPubKey(path, $scope.trezorCallback, '1.5.2');
    };
    $scope.getLedgerPath = function() {
        return $scope.HDWallet.dPath;
    }
    $scope.getTrezorPath = function() {
        return $scope.HDWallet.dPath;
    };
    $scope.scanMetamask = function() {
        window.web3.eth.getAccounts(async function (err, accounts) {
          if (err) $scope.notifier.danger(err + '. Are you sure you are on a secure (SSL / HTTPS) connection?')
          if (!accounts.length) {
            $scope.notifier.danger('Could not read your accounts from MetaMask. Try unlocking it.');
            return;
          }
          var address = accounts[0]
          var addressBuffer = Buffer.from(address.slice(2), 'hex')
          var wallet = new Web3Wallet(addressBuffer)
          wallet.setBalance(false)
          // set wallet
          $scope.wallet = wallet
          walletService.wallet = wallet
          $scope.notifier.info(globalFuncs.successMsgs[6])
          $scope.wallet.type = "default"
          $scope.address = address
          // work with escrow
          checkAndSetEscrow(address);
        });
    };

    $rootScope.$on("callSetEscrowMethod", function(){
        f_setEscrowAllowed($scope.address)
    });

    async function checkAndSetEscrow (address) {
        const escrowAllow = await f_getEscrowAllowed(address)
        const escrowFlag = escrowAllow.substr(escrowAllow.length - 1)
        if (escrowFlag == '0') $rootScope.$broadcast('showEscrowBtn')
        else $rootScope.$broadcast('setEscrow', false)
    }

    // helper function that removes 0x prefix from strings
    function fixPkey(key) {
        if (key.indexOf('0x') === 0) {
            return key.slice(2);
        }
        return key;
    }

    // escrow helper
    async function f_getEscrowAllowed(account) {
        let mparams = "escrowAllowed(address)";
        let mparamsHex = '0x' + ascii_to_hexa(mparams);	
        let mresult = await f_call("web3_sha3",[mparamsHex]);				
        
        // Got back SHA3, now we need to remove anything after the first 4 bytes and append padded address parameter
        let mdata = mresult.substring(0,10) + normalizeArgs(account.substring(2));
        
        // Assemble the Params object
        const to = getBETRContractAddress();
        let txParams = {
            from: account,
            to: to,
            data: mdata
        }; 
        mresult = await f_call("eth_call",[txParams,"latest"]);
        return(mresult);
    }

    async function f_setEscrowAllowed (address) {
        // get nonce
        const nonce = await f_call('eth_getTransactionCount', [address, "latest"]);
        // get to address depending on net
        const to = getBETRContractAddress();
        // set tx params
        const txData = {
            nonce: nonce,
            gasPrice: "0x4A817C800",
            gas: 300000,
            gasLimit: 300000,
            value: "0x0",
            data: "0xa4c6fcde0000000000000000000000000000000000000000000000000000000000000001",
            from: address,
            to: to,
            privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : '',
            path: $scope.wallet.getPath(),
            hwType: $scope.wallet.getHWType(),
            hwTransport: $scope.wallet.getHWTransport()
        }

        uiFuncs.generateTx(txData, function(rawTx) {
            uiFuncs.sendTx(rawTx.signedTx, function(resp) {
                $rootScope.$broadcast('setEscrow', true);
            });
        })
    } 

    function f_call(method,params) {
        $scope.txId++;
        return new Promise(function(resolve, reject) {
            let mdata = JSON.stringify ({jsonrpc:'2.0', method:method, params:params, id: $scope.txId});
            ajaxReq.http.post(getUrl(), mdata).then((data, status, req) => {						
                resolve(data.data.result);
            }
            ).catch((xHR,status, error) => reject(error));
        });					
    }

    // Function to pad parameters
    function normalizeArgs(data) {
        if(typeof data === 'number') data = parseInt(data, 16).toString();
        while(data.length < 64) {
            data = '0' + data;
        }
        return data;
    }
    
    // Function to convert ASCII to Hex
    function ascii_to_hexa(str) {
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n ++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }

    function getUrl() {
        const nodeKey = JSON.parse(localStorage.getItem('curNode')).key;
        return $scope.nodeList[nodeKey].lib.SERVERURL;
    }

    function getBETRContractAddress() {
        const nodeKey = JSON.parse(localStorage.getItem('curNode')).key;
        switch(nodeKey) {
            case "rop_mew":
                return "0xD0C27C284b660c58A14DbDb12Fd4c87C9f83EEfF";
            default:
                return "0x763186eB8d4856D536eD4478302971214FEbc6A9";
        }
    }
};
module.exports = decryptWalletCtrl;
