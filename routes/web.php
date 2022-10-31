<?php

use Illuminate\Support\Facades\Route;
use Mockery\Undefined;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $file1 = file_get_contents('./../storage/my_spotify_data/MyData/StreamingHistory0.json');
    $file2 = file_get_contents('./../storage/my_spotify_data/MyData/StreamingHistory1.json');
    $jsonData1 = json_decode($file1, true);
    $jsonData2 = json_decode($file2, true);
    $jsonData = array_merge($jsonData1, $jsonData2);
    $numberOfPlays = [];
    $artists = ['artistName' => [], 'trackName' => [], 'artistStats' => []];
    $count = 0;
    $now = time();
    $startOfYear = strtotime('2022-01-01');
    $daysSinceYearStart = ($now - $startOfYear) / 60 / 60 / 24;

    while ($count < count($jsonData)) {
        $count++;
        if (strtotime($jsonData[$count - 1]['endTime']) < strtotime('2022-01-01')) {
            continue;
        }

        $artistName = strtoupper($jsonData[$count - 1]['artistName']);
        $trackName = strtoupper($jsonData[$count - 1]['trackName']);
        $minPlayed = strtoupper($jsonData[$count - 1]['msPlayed']) / 1000 / 60;

        if (!array_key_exists($artistName, $artists['artistName'])) {
            $artists['artistName'][$artistName] = 0;
        }

        if (!array_key_exists($trackName, $artists['trackName'])) {
            $artists['trackName'][$trackName] = 0;
        }

        if (!array_key_exists($artistName, $artists['artistStats'])) {
            $artists['artistStats'][$artistName] = [];
        }
        if (!array_key_exists($trackName, $artists['artistStats'][$artistName])) {
            $artists['artistStats'][$artistName][$trackName] = [];
        }

        $artists['artistName'][$artistName] = $artists['artistName'][$artistName] + $minPlayed;
        $artists['trackName'][$trackName]++;
        array_push($artists['artistStats'][$artistName][$trackName], $minPlayed);
    }
    $totalTime = round(array_sum($artists['artistName']), 0);
    $topArtist = $artists['artistStats'][array_key_first($artists['artistStats'])];
    arsort($topArtist);
    arsort($artists['artistName']);
    arsort($artists['trackName']);
    $top5Artists = array_slice($artists['artistName'], 0, 5);
    $top5Tracks = array_slice($artists['trackName'], 0, 5);
    $top5TracksArtist = array_slice($topArtist, 0, 5);
    $numberOfPlays = array_sum($artists['trackName']);
    $totalTimeArtist = 0;
    $numberOfPlaysArtist = 0;
    foreach ($topArtist as $key => $value) {
        $totalTimeArtist = round($totalTimeArtist + array_sum($topArtist[$key]), 0);
        $numberOfPlaysArtist = $numberOfPlaysArtist + count($topArtist[$key]);
    }

    $minutesPerDay = round($totalTime / $daysSinceYearStart, 0);
    $minutesPerDayArtist = round($totalTimeArtist / $daysSinceYearStart, 0);
    //Variables to pass: timeInMinutes, timeInHours, top5, timePerSong, artists
    /* echo('<body style="background-color: gray; color: white; font-family: sans-serif; width: fit-content">');
    echo('<h1>Metallica Stats 2022</h1>');
    echo('<h3>Number of songs listened to: </h3>' . count($metallica) . ' songs');
    echo('<h3>Top 5 listened songs 2022: </h3>');
    foreach ($top5 as $key => $value) {
        echo('<div>' . $key . ': ' . $top5[$key] . '</div><br>');
    }
    echo('</div>');
    
    echo('<h3>Minutes Listened: </h3>' . round($timeInMinutes, 0) . ' minutes<br>');
    echo('<h3>Hours Listened: </h3>' . round($timeInHours, 0) . ' hours<br>');
    echo('<h3>Minutes per day listened: </h3>' . round($timeInMinutes / $daysSinceYearStart, 0) . ' minutes per day<br>');
    echo('</body>'); 
    ['timeInMinutes' => $timeInMinutes]*/
    return view('welcome', ['numberOfPlays' => $numberOfPlays, 'top5Artists' => array_keys($top5Artists), 'top5Tracks' => array_keys($top5Tracks), 'totalTime' => $totalTime, 'minutesPerDay' => $minutesPerDay, 'numberOfPlaysArtist' => $numberOfPlaysArtist, 'top5TracksArtist' => array_keys($top5TracksArtist), 'totalTimeArtist' => $totalTimeArtist, 'minutesPerDayArtist' => $minutesPerDayArtist]);
});
