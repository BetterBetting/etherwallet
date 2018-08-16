<main 
    class="tab-pane active" 
    ng-if="globalService.currentTab==globalService.tabs.betrPlaceBet.id" 
    ng-controller="betrPlaceBetCtrl" 
    ng-cloak>
    
    <!--
    to:{{to}}<br/>
    data:{{data}}<br/>
    -->

  <!--wallet decrypt-->
    <div ng-show="showBetSuccessModal" class="bet-success-overlay"></div>
    <article ng-show="visibility=='interactView' && !qs">
        @@include( '../includes/betr-faq.tpl', { "site": "mew" } )
    </article>

    <article class="form-group" ng-show="visibility=='interactView' && qs">
        <wallet-decrypt-drtv></wallet-decrypt-drtv>
    </article>

    <!-- <article ng-show="visibility=='interactView'"> -->
    <article ng-show="visibility=='interactView' && qs">

    @@include( '../includes/contracts-interact-modal.tpl', { "site": "mew" } )

    </article>

    <div ng-show="showBetSuccessModal" class="block bet-success-modal">
        <div>
            {{modalMsg}}
            <button class="btn btn-primary close-bet-modal"
                ng-click="modalCallback()">
                <span>Close</span>
            </button>
        </div>
    </div>

    <button class="btn btn-primary btn-block"
            ng-click="setEscrowFlag()"
            ng-hide="!showSetEscrowBtn">
        <span>Enable BETR betting support on your wallet</span>
    </button>

    <button class="btn btn-primary btn-block"
            ng-click="generateContractTx()"
            ng-hide="!escrowAllow"
            ng-show="!contract.functions[contract.selectedFunc.index].constant && qs">
        <span>Place Bet - {{stake}} BETR</span>
    </button>
    
</main>