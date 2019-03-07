1. //Реализуйте таймер обратного отсчёта. Формат — два знака после запятой. В конце работы таймер должен вызывать колбэк onFinish с параметром $endTime, куда будет передан new Date().
angular.module('myApp', []).controller('MyCtrl', class {
    constructor($interval) {
        this.interval = $interval;
        this.timerId = 0;
        this.timers = [];
        this.addTimer(10);
        this.addTimer(3);

    }

    $onInit() {
        this.setInterval();
    }
    setInterval(){
        this.interval(() => {
            if (this.timers.length) {
                this.timers.forEach(item => {
                    let seconds = item.seconds;
                    if(seconds >= 0.01){
                        item.seconds = (item.seconds -0.01).toFixed(2);
                        if(item.seconds < 0.01){
                            this.$endTime = new Date();
                        }
                    }

                })
            }
        }, 10);
    }
    setStatus(){

    }

    addTimer(seconds) {
        this.timers.push({
            id: this.timerId++,
            seconds
        });
    }


    removeTimer(index) {
        this.timers.splice(index, 1);
    }
}).component('myTimer', {
    bindings: {
        startSeconds: '@',
        onFinish: '&?',
    },
    template: `<span>{{$ctrl.startSeconds}}</span>`,
    controller: timerController
});

function timerController($scope){
    console.log('$scope', $scope.$parent);
    $scope.$watch('$ctrl.startSeconds', ()=> {
        console.log('startSeconds', this.startSeconds);
        if(this.startSeconds == 0){
            this.onFinish();
        }
    })
}
