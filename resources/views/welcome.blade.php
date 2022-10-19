<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Donkeyquiz</title>
        <link href='https://fonts.googleapis.com/css?family=Poppins:500,600,700' rel='stylesheet'>
    </head>
    <body class="flex justify-center h-screen text-darkblue bg-white box-border px-8 font-poppins transition-all tablet:px-16">
        <!--Init of tailwind classes -->

        <div class="hidden bg-lightgray"></div>
        <div class="hidden bg-green"></div>
        <div class="hidden duration-3000"></div>

        <!--Start of nav -->
        <nav class="absolute top-0 left-0 w-full">
            <div class="flex m-8 justify-items-start items-center gap-8 tablet:ml-16 laptop:flex-col laptop:items-center laptop:w-fit laptop:gap-2">
                <img id="logo" src="/images/LogoPrimary.svg" class="w-24 transition-all duration-0">
                <h3 id="nav-header" class="text-24 font-semibold transition-all duration-0">donkeyquiz</h3>
            </div>
        </nav>
        
        <!--Start of blobs -->
        <svg viewBox="120 0 100 200" class="hidden w-[225px] left-0 top-[600px] absolute tablet:block laptop:w-[250px] laptop:top-[300px] desktop:w-[300px] desktop:top-[300px]">
            <path id="left-blob" d="" fill="#7678ED"></path>
        </svg>

        <svg viewBox="-20 0 100 200" class="hidden w-[250px] right-0 top-[500px] absolute tablet:block laptop:w-[275px] laptop:top-[150px] desktop:w-[350px] desktop:top-[175px]">
            <path id="right-blob" d="" fill="#7678ED"></path>
        </svg>

        <!--Start of progress bar-->
        <div id="progress-bar-container" class="absolute hidden px-8 bottom-8 tablet:px-48 w-full scale-0 laptop:p-0 laptop:w-1/2">
            <div id="progress-line" class="w-full h-[2px] relative bg-lightblue rounded-full flex align-center">
                <div id="progress-bar" class="h-[14px] absolute -mt-[6px] rounded-full bg-darkblue"></div>
            </div>
            <h4 id="question-number" class="w-full text-center mt-4"></h4>
        </div>

        <!--Start of front page -->
        <div id="front-page" class="hidden w-full h-full">
            <div class="flex flex-col justify-between items-center py-52 h-full tablet:py-72 laptop:pt-56 laptop:pb-36">
                <div id="front-page-text" class="flex flex-col gap-4 items-center duration-300 scale-0">
                    <h2 class="text-24 text-center font-semibold tablet:text-32 laptop:text-40 desktop:text-48">Svensk mästare i TP?</h2>
                    <p class="text-16 text-center w-52 tablet:text-center tablet:w-96 laptop:w-[450px]">Utmana vänner, kollegor och familj på frågesport. Svara på 35 samtida frågor i 7 olika kategorier.</p>
                </div>
                <div id="front-page-button-container" class="flex justify-center w-full duration-300 scale-0">
                    <input id="front-page-button" type="button" value="Klicka här för att starta" class="p-4 border-2 w-full rounded-full border-lightblue text-lightblue active:bg-darkblue active:text-white active:border-darkblue tablet:self-center tablet:w-96 laptop:hover:bg-darkblue laptop:hover:border-darkblue laptop:hover:text-white laptop:w-64 laptop:hover:cursor-pointer">
                </div>
            </div>
        </div>

        <!--Start of second page-->
        <div id="question-page" class="hidden w-full h-full">
            <div class="flex flex-col justify-between items-center py-52 h-full tablet:py-72 laptop:pt-56 laptop:pb-36">
                <div id="question-page-text" class="flex flex-col gap-4 items-center duration-300 scale-0">
                    <h4 id="category" class="text-14 text-center font-semibold text-lightblue"></h4>
                    <h2 id="question" class="text-20 text-center w-full font-semibold tablet:text-32 tablet:w-[656px] laptop:w-9/12 laptop:text-40 desktop:text-48"></h2>
                </div>
                <div id="question-page-button-container" class="flex justify-center w-full duration-300 scale-0">
                    <input id="question-page-button" type="button" value="Se svaret" class="p-4 border-2 rounded-full w-full border-lightblue text-lightblue active:bg-darkblue active:text-white active:border-darkblue tablet:self-center tablet:w-96 laptop:hover:bg-darkblue laptop:hover:border-darkblue laptop:hover:text-white laptop:w-64 laptop:hover:cursor-pointer">
                </div>
            </div>
        </div>

        <!--Start of third page-->
        <div id="answer-page" class="hidden w-full h-full text-white">
            <div class="flex flex-col justify-between items-center py-52 h-full tablet:py-72 laptop:pt-56 laptop:pb-36">
                <div id="answer-page-text" class="flex flex-col gap-4 w-full items-center duration-300 scale-0">
                    <h4 class="text-14 text-center font-semibold">Rätt svar</h4>
                    <h2 id="answer" class="text-green text-center text-28 tablet:text-36 laptop:w-9/12 laptop:text-48 font-semibold"></h2>
                </div>
                <div id="answer-page-button-container" class="flex w-full flex-col gap-4 items-center duration-300 scale-0 laptop:gap-8">
                    <h4 class="text-14 text-semibold text-center laptop:mt-0">Svarade du rätt?</h4>
                    <div class="flex flex-col gap-4 w-full tablet:w-2/3 laptop:flex-row laptop:justify-center">
                        <input id="answer-page-button-yes"type="button" value="Ja" class="p-4 border-2 rounded-full border-white active:bg-darkblue active:border-darkblue tablet:self-center tablet:w-96 laptop:hover:bg-darkblue laptop:hover:border-darkblue laptop:hover:text-white laptop:w-64 laptop:hover:cursor-pointer">
                        <input id="answer-page-button-no" type="button" value="Nej" class="p-4 border-2 rounded-full border-white active:bg-darkblue active:border-darkblue tablet:self-center tablet:w-96 laptop:hover:bg-darkblue laptop:hover:border-darkblue laptop:hover:text-white laptop:w-64 laptop:hover:cursor-pointer">
                    </div>
                </div>
            </div>
        </div>

        <!--Start of last page-->
        <div id="result-page" class="hidden bg-white text-darkblue">
            <div class="flex flex-col pt-40 items-center gap-4 tablet:pt-64 laptop:pt-42">
                <div id="result-page-text" class="flex flex-col items-center duration-300 scale-0">
                    <h4 class="hidden text-14 font-semibold tablet:block">Ditt resultat</h4>
                    <h2 id="total-result" class="text-24 font-semibold tablet:text-48"></h2>
                </div>
                <div id="result-page-blobs" class="flex flex-row w-72 justify-center gap-2 flex-wrap duration-300 scale-0 tablet:w-96 tablet:mb-4 laptop:w-fit"> 
                    <div class="flex flex-col align-center gap-1 laptop:w-24 laptop:gap-4">
                        <ul id="mov-blobs" class="flex flex-row w-full justify-center gap-4 -order-1 laptop:flex-col-reverse laptop:w-fit laptop:-order-3 laptop:self-center">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 class="w-full text-center -order-2">Film & TV</h4>
                    </div>
                    <div class="flex flex-col align-center gap-1 laptop:w-24 laptop:gap-4">
                        <ul id="geo-blobs" class="flex flex-row w-full justify-center gap-4 -order-1 laptop:flex-col-reverse laptop:w-fit laptop:-order-3 laptop:self-center">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 class="w-full text-center -order-2">Geografi</h4>
                    </div>
                    <div class="flex flex-col align-center gap-1 laptop:w-24 laptop:gap-4">
                        <ul id="his-blobs" class="flex flex-row w-full justify-center gap-4 -order-1 laptop:flex-col-reverse laptop:w-fit laptop:-order-3 laptop:self-center">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 class="w-full text-center -order-2">Historia</h4>
                    </div>
                    <div class="flex flex-col align-center gap-1 laptop:w-24 laptop:gap-4">
                        <ul id="mus-blobs" class="flex flex-row w-full justify-center gap-4 -order-1 laptop:flex-col-reverse laptop:w-fit laptop:-order-3 laptop:self-center">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 class="w-full text-center -order-2">Musik</h4>
                    </div>
                    <div class="flex flex-col align-center gap-1 laptop:w-24 laptop:gap-4">
                        <ul id="oth-blobs" class="flex flex-row w-full justify-center gap-4 -order-1 laptop:flex-col-reverse laptop:w-fit laptop:-order-3 laptop:self-center">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 class="w-full text-center -order-2">Övrigt</h4>
                    </div>
                    <div class="flex flex-col align-center gap-1 laptop:w-24 laptop:gap-4">
                        <ul id="sci-blobs" class="flex flex-row w-full justify-center gap-4 -order-1 laptop:flex-col-reverse laptop:w-fit laptop:-order-3 laptop:self-center">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 class="w-full text-center -order-2">Vetenskap</h4>
                    </div>
                    <div class="flex flex-col align-center gap-1 laptop:w-24 laptop:gap-4">
                        <ul id="spo-blobs" class="flex flex-row w-full justify-center gap-4 -order-1 laptop:flex-col-reverse laptop:w-fit laptop:-order-3 laptop:self-center">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 class="w-full text-center -order-2">Sport</h4>
                    </div>
                </div>
                <div id="result-page-button-container" class="flex justify-center w-full duration-300 scale-0">
                    <input id="result-page-button" type="button" value="En runda till" class="w-full p-4 border-2 rounded-full border-lightblue text-lightblue active:bg-darkblue active:text-white active:border-darkblue tablet:self-center tablet:w-96 laptop:hover:bg-darkblue laptop:hover:border-darkblue laptop:hover:text-white laptop:w-64 laptop:hover:cursor-pointer">
                </div>
            </div>
        </div>

        <script type="module" crossorigin src="http://localhost:3000/@@vite/client"></script>
        <script type="module" crossorigin src="http://localhost:3000/resources/js/app.js"></script>
        
    </body>
</html>

