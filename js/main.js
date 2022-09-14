var korta = [];
var howmuch = 0;
var atverstakorta = [];
var atverstakortanr = [];
var kortelesnumeris = [];
var apsauga = false;
var intervalas;
var minutes = 0;
var seconds = 0;
var currentTimeString;
var timerstarts = false;
var towin = 0;
var cardcount = 0;

$(document).ready(function () {
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    
    function createCards(count) {
        howmuch = 0;
        cardcount = count;
        atverstakorta = [];
        korta = [];
        atverstakortanr = [];
        kortelesnumeris = [];
        $(".cardbox").empty();
        var laik = 0;
        for (let i = 0; i < count * 2; i++) {
            $('.cardbox').append($('<div class="card" id = "' + i + '">'));
            
            if (i >= count) {
                kortelesnumeris.push(laik);
                laik++;
            }
            else {
                kortelesnumeris.push(i);
            }
        }
        shuffle(kortelesnumeris);
    }
    
    createCards(6);

    $(".pairbtn").click(function () {
        createCards($(".pairsnr").val());
        minutes = 0;
        seconds = 0;
        towin = 0;
        clearInterval(intervalas);
        $('.timetitle').html(" Time spent: 0:00");
        $('.timetitle').css("color","white");
        timerstarts = false;
    });
});
$(document).click(function (event) {
    
    $(".card").click(function () {
        
        if (timerstarts == false) {
            timerstarts = true;
            intervalas = setInterval(function () {


                if (seconds < 59) {
                    seconds++;
                }
                else {
                    seconds = 0;
                    minutes++;
                }
                if (seconds >= 0 && seconds < 10) {
                    currentTimeString = minutes + ":0" + seconds;
                }
                else {
                    currentTimeString = minutes + ":" + seconds;
                }

                $(".clock").html();
                $('.timetitle').html(" Time spent: " + currentTimeString);
                
            }, 1000);
        }
        if (apsauga == false) {
            var kortosid = parseInt($(this).attr('id'));
            if (korta[kortosid] != 1 && howmuch <= 1) {  
                apsauga = true;
                korta[kortosid] = 1;

                atverstakorta[howmuch] = this;
                atverstakortanr[howmuch] = kortosid;
                howmuch++;
                $(this).css("transition", "transform 0.6s");
                $(this).css("transform-style", "preserve-3d");
                $(this).css("transform", "rotateY(720deg)");
                $(this).append($('<p class = "oncardnr">').html(kortelesnumeris[kortosid]));
                $(this).css("background-image", "url('style/img/background.png')");
                apsauga = false;
            }



            if (howmuch == 2) {
                apsauga = true;
                window.setTimeout(function () {
                    if (kortelesnumeris[atverstakortanr[0]] == kortelesnumeris[atverstakortanr[1]]) {
                        $(".oncardnr").css("color", "green");
                        howmuch = 0;
                        apsauga = false;
                        towin++;
                        console.log(cardcount);
                        if(towin>=cardcount)
                        {
                            clearInterval(intervalas);
                            $('.timetitle').html(" You won! Your time:  " + currentTimeString );
                            $('.timetitle').css("color","green");
                        }
                    }
                    else { // jeigu skaiciai nesutampa
                        $(atverstakorta[0]).css("transition", "transform 0.6s");
                        $(atverstakorta[0]).css("transform-style", "preserve-3d");
                        $(atverstakorta[0]).html("");
                        $(atverstakorta[0]).css("transform", "rotateY(360deg)");
                        $(atverstakorta[0]).css("background-image", "url('style/img/card.png')");

                        $(atverstakorta[1]).css("transition", "transform 0.6s");
                        $(atverstakorta[1]).css("transform-style", "preserve-3d");
                        $(atverstakorta[1]).css("transform", "rotateY(360deg)");
                        $(atverstakorta[1]).css("background-image", "url('style/img/card.png')");
                        $(atverstakorta[1]).html("");
                        korta[atverstakortanr[0]] = 0; // uzverciam korta 0
                        korta[atverstakortanr[1]] = 0; // uzverciam korta 1
                        howmuch = 0; // leidziam versti kitas kortas
                        apsauga = false;
                    }

                }, 1000);
                
            }
        }
        });
});
$(document).mousemove(function (event) {
    $(".card").mouseover(function () {
        $(this).css('opacity', 0.5);
    });
    $(".card").mouseout(function () {
        $(this).css('opacity', 1);
    });
});
