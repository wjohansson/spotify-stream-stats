<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Route::get('/questions', function () {

    $file = file_get_contents('./../storage/questions.json');
    $jsonData = json_decode($file, true);

    $questions = [];
    $count = ["Film & TV" => [], "Geografi" => [], "Historia" => [], "Musik" => [], "Övrigt" => [], "Vetenskap" => [], "Sport" => []];

    while (count($questions) < 3) {
        $randomNumber = rand(0, (count($jsonData) - 1)); 
        if (in_array($jsonData[$randomNumber], $questions)) {
            continue;
        }
        
        $category = $jsonData[$randomNumber]["category"];

        if (count($count["Film & TV"]) < 5 && $category === "Film & TV") {
            array_push($count["Film & TV"], 1);
        } elseif (count($count["Film & TV"]) === 5 && $category === "Film & TV") {
            continue;
        }

        if (count($count["Geografi"]) < 5 && $category === "Geografi") {
            array_push($count["Geografi"], 1);
        } elseif (count($count["Geografi"]) === 5 && $category === "Geografi") {
            continue;
        }

        if (count($count["Historia"]) < 5 && $category === "Historia") {
            array_push($count["Historia"], 1);
        } elseif (count($count["Historia"]) === 5 && $category === "Historia") {
            continue;
        }

        if (count($count["Musik"]) < 5 && $category === "Musik") {
            array_push($count["Musik"], 1);
        } elseif (count($count["Musik"]) === 5 && $category === "Musik") {
            continue;
        }

        if (count($count["Övrigt"]) < 5 && $category === "Övrigt") {
            array_push($count["Övrigt"], 1);
        } elseif (count($count["Övrigt"]) === 5 && $category === "Övrigt") {
            continue;
        }

        if (count($count["Vetenskap"]) < 5 && $category === "Vetenskap") {
            array_push($count["Vetenskap"], 1);
        } elseif (count($count["Vetenskap"]) === 5 && $category === "Vetenskap") {
            continue;
        }

        if (count($count["Sport"]) < 5 && $category === "Sport") {
            array_push($count["Sport"], 1);
        } elseif (count($count["Sport"]) === 5 && $category === "Sport") {
            continue;
        }

        array_push($questions, $jsonData[$randomNumber]);
    }
    return response()->json($questions);
});