$(window).on('load', function () {
    (function () {
        const rollItBtn = $('.roll-it');
        const moneyCounter = $('.coinflip-counter');
        let condition;
        let checkRand;
        let clickedBtn;
        let checkClick = true;
        let usedValue;
        //SETTINGS
        let startMoney = 10000;

        //FUNCTIONITE
        let checkValue = function () {
            const reg = /^\d+$/;
            usedValue = $('input[type=text]').val();
            if (reg.test(usedValue)) {
                if (usedValue != '0' && usedValue != '' && usedValue - 1 < startMoney) {
                    if (typeof usedValue === 'string') {
                        usedValue = parseInt(usedValue);
                        if (usedValue > 0) {
                            condition = true;
                            return usedValue;
                        } else {
                            condition = false;

                        };
                    };
                } else {
                    condition = false;
                };
            } else {
                condition = false;
            };
            if (condition) {
                $('input[type=text]').removeClass('false');

            } else {
                $('input[type=text]').addClass('false');
                setTimeout(function () {
                    $('input[type=text]').removeClass('false');
                }, 500)

            };


        };
        let removeFromCounter = function (valueOfInput) {
            valueOfInput = checkValue();
            if (condition) {
                startMoney = startMoney - valueOfInput;
                $('input[type=text]').removeClass('false');
                $('.coinflip-counter').html(`Twoje punkty: ${startMoney}`);
                doRand();
            }

        }
        let doRand = function (x) {
            x = Math.floor(Math.random() * 100)
            if (x > 50) {
                checkRand = true;
            } else {
                checkRand = false;
            }
        };
        let checkResult = function (valueToWin) {
            if (condition) {
                valueToWin = usedValue * 2;
                $('.coinflip-animation').addClass('true');
                if (clickedBtn === 0 && checkRand === true) {
                    startMoney = startMoney + valueToWin;
                    setTimeout(function () {
                        $('.coinflip-counter').html(`Twoje punkty: ${startMoney}`);
                        $('.coinflip-animation').removeClass('true');
                        $('.coinflip-animation').css({
                            backgroundImage: 'url(coin.png)',
                        })

                    }, 1950)

                } else if (clickedBtn === 1 && checkRand === false) {
                    startMoney = startMoney + valueToWin;
                    setTimeout(function () {
                        $('.coinflip-counter').html(`Twoje punkty: ${startMoney}`);
                        $('.coinflip-animation').removeClass('true');
                        $('.coinflip-animation').css({
                            backgroundImage: 'url(euro.png)',
                        })
                    }, 1820)

                } else if (clickedBtn === 0 && checkRand === false) {
                    setTimeout(function () {
                        $('.coinflip-animation').removeClass('true');
                        $('.coinflip-animation').css({
                            backgroundImage: 'url(euro.png)',
                        })
                    }, 1820)
                } else if (clickedBtn === 1 && checkRand === true) {
                    setTimeout(function () {
                        $('.coinflip-animation').removeClass('true');
                        $('.coinflip-animation').css({
                            backgroundImage: 'url(coin.png)',
                        })
                    }, 1950)
                }

            }
        }

        let doCoinFlipping = function () {
            if (checkClick) {
                checkClick = false;
                clickedBtn = $(this).data('value');
                checkValue();
                removeFromCounter();
                checkResult();
                setTimeout(function () {
                    checkClick = true;
                }, 2000)
            } else {
                return false;
            }



        };
        $('.coinflip-counter').html(moneyCounter.html() + startMoney);


        rollItBtn.on('click', doCoinFlipping);
    })();
});
