<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href='https://fonts.googleapis.com/css?family=Poppins:500,600,700' rel='stylesheet'>

</head>

<body class="bg-green font-poppins w-screen box-border text-darkblue text-20">
    <div id="wrapper" class="w-screen px-16">
        <nav class="absolute mt-16">
            <h1 class="w-fit text-48 text-lightblue">Spotify Stats 2022</h1>
        </nav>
        <div id="front-page" class="flex flex-col justify-center gap-2 pt-48">
            <h2 class="text-36 text-lightblue w-full">General stats</h2>
            <div class="flex justify-between">
                <div class="flex flex-col w-1/2 gap-2">
                    <h3>Total number of songs and podcasts listened to: </h3>
                    <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">{{ $numberOfPlays }}</div>
                    <h3>Time listened in 2022: </h3>
                    <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">{{ $totalTime }}
                        minutes or
                        {{ round($totalTime / 60, 0) }} hours</div>
                    <h3>Minutes per day listened: </h3>
                    <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">{{ $minutesPerDay }}
                        minutes
                    </div>
                </div>
                <div class="flex flex-col w-1/2 gap-2">
                    <h3>Top 5 listened to artists or podcasts in 2022: </h3> <!-- Dynamically add most time played-->
                    <div class="flex flex-wrap gap-2">
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">1:
                            {{ $top5Artists[0] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">2:
                            {{ $top5Artists[1] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">3:
                            {{ $top5Artists[2] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">4:
                            {{ $top5Artists[3] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">5:
                            {{ $top5Artists[4] }}
                        </div>
                    </div>
                    <h3>Top 5 listened to songs in 2022: </h3> <!-- Dynamically add number of times-->
                    <div class="flex flex-wrap gap-2">
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">1:
                            {{ $top5Tracks[0] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">2:
                            {{ $top5Tracks[1] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">3:
                            {{ $top5Tracks[2] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">4:
                            {{ $top5Tracks[3] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">5:
                            {{ $top5Tracks[4] }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute self-center bottom-8 flex justify-center">
                <button id="front-page-button" class="bg-lightblue rounded-full text-24 text-green w-64 p-4">Next
                    Page</button>
            </div>
        </div>
        <div id="second-page" class=" hidden flex-col justify-center pt-48 gap-2">
            <h2 class="text-36 text-lightblue w-full">Favorite artist stats</h2>
            <div class="flex justify-between">
                <div class="flex flex-col w-1/2 gap-2">
                    <h3>Favorite artist: </h3>
                    <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">{{ $top5Artists[0] }}</div>
                    <h3>Total number of songs listened to: </h3>
                    <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">{{ $numberOfPlaysArtist }}</div>
                    <h3>Time listened in 2022: </h3>
                    <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">{{ $totalTimeArtist }}
                        minutes or
                        {{ round($totalTimeArtist / 60, 0) }} hours</div>
                    <h3>Minutes per day listened: </h3>
                    <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">{{ $minutesPerDayArtist }}
                        minutes
                    </div>
                </div>
                <div class="flex flex-col w-1/2 gap-2">
                    <h3>Top 5 listened to songs in 2022: </h3> <!-- Dynamically add number of times-->
                    <div class="flex flex-wrap gap-2">
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">1:
                            {{ $top5TracksArtist[0] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">2:
                            {{ $top5TracksArtist[1] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">3:
                            {{ $top5TracksArtist[2] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">4:
                            {{ $top5TracksArtist[3] }}
                        </div>
                        <div class="bg-lightblue rounded-full text-24 text-green w-fit px-4 ml-4">5:
                            {{ $top5TracksArtist[4] }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute self-center bottom-8 flex justify-center">
                <button id="second-page-button" class="bg-lightblue rounded-full text-24 text-green w-64 p-4">Previous
                    Page</button>
            </div>
        </div>
    </div>

    <script type="module" crossorigin src="http://localhost:3000/@@vite/client"></script>
    <script type="module" crossorigin src="http://localhost:3000/resources/js/app.js"></script>
</body>

</html>
