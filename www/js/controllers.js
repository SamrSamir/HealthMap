/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $compile, report, $http, $state)
        {
            var count = 0;
            $scope.showButton = false;

            //report.id = "8d6c8af4-df12-f2e7-1a36-43f8b78d86c3";
            //function initialize() {
                var myLatlng = new google.maps.LatLng(24.493520, 54.379305);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);

                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });

                //var marker = new google.maps.Marker({
                //    position: myLatlng,
                //    map: map,
                //    title: 'Home'
                //});
                //
                //google.maps.event.addListener(marker, 'click', function () {
                //    infowindow.open(map, marker);
                //});
            $scope.arrayOFSym = [];

            google.maps.event.addListener(map, 'click', function(event) {
                count = count + 1;
                placeMarker(event.latLng);
                console.log(event.latLng.lng() + " followed by " + event.latLng.lat());
                var combined = event.latLng.lng() + "," + event.latLng.lat();
                $scope.arrayOFSym.push(combined);
                var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
                ref.child(report.id).update({
                    locations : $scope.arrayOFSym
                });
            });

            function placeMarker(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            }


                $scope.map = map;
            //}

            //google.maps.event.addDomListener(window, 'load', initialize);

            var d = new Date();
            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).update({
                timeStamp :d
            });
            console.log('current timeStamp updated' + d);

            navigator.geolocation.getCurrentPosition(function (pos) {
                //$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                //$scope.loading.hide();
                var combined = pos.coords.latitude + "," + pos.coords.longitude;
                $scope.lat = pos.coords.latitude;
                $scope.long = pos.coords.longitude;
                var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
                ref.child(report.id).update({
                    currentLocation :combined
                });
                console.log('current location updated' + combined);





                var API_KEY="26fbd15c427ea7eff51fe88bd73b36e0";
                $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+pos.coords.latitude+"&lon="+pos.coords.longitude+"&APPID="+API_KEY)
                    .success(
                    function(data) {
                        var jsonData = JSON.stringify(data);
                        var js = JSON.parse(jsonData);

                        //console.log(jsonData);
                        var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
                        ref.child(report.id).update({
                            fromAPI1: js
                        });
                        $scope.location = jsonData.name;
                        console.log('API 1 updated' + jsonData);
                        console.log('API 1 updated, location: ' + $scope.location);
                        //console.log(js.weather[0].id);
                        //$scope.location = js.name;
                        console.log('API 1 updated' + jsonData);
                        //console.log('API 1 updated, location: ' + $scope.location);


                    })



                $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+pos.coords.latitude+","+pos.coords.longitude+"&sensor=true")
                    .success(
                    function(data)
                    {
                        var jsonData=JSON.stringify(data);
                        var js = JSON.parse(jsonData);

                        console.log(jsonData);

                        console.log(js.results[0].address_components[2].short_name);

                        $scope.location = js.results[0].address_components[2].short_name;
                        $scope.location = $scope.location.replace(/\s+/g, '+');
                        console.log($scope.location);

                        console.log("Split city name: " + $scope.location);
                        $http.get("http://carma.org/api/1.1/searchLocations?name=" + $scope.location)
                            .success(
                            function (data) {
                                var jsonData = JSON.stringify(data);
                                var js = JSON.parse(jsonData);
                                var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
                                ref.child(report.id).update({
                                    fromAPI2: js
                                });
                                console.log("fromAPI2" + jsonData);
                                $scope.showButton = true;
                            })
                            .error(function(error){
                                console.log("Error: " + error);
                                $scope.showButton = true;
                            });

                    }

                )
                    .error();


            }, function (error) {
                console.log('Unable to get location: ' + error.message);
                $scope.showButton = true;
            });




            $scope.next = function() {
                $state.go("main");

            }

    })

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

 .controller('SymptomCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, report, $state, $http) {
        // Set Header

        $http.get('js/symptom_W_video.json').then(function(response) {
            $scope.symptoms = response.data;
            console.log("symtopms "+ $scope.symptoms[0].symptom);
        }, function(response) {
            console.log("error :" +response.data);
            $scope.datam = response.data || "Request failed";
        });


        //report.id = "8d6c8af4-df12-f2e7-1a36-43f8b78d86c3";

        $scope.isExpanded = false;


        $scope.arrayOFSym = [];

        $scope.newValue = function(sym){
            $scope.arrayOFSym.push(sym);
            $scope.ageShown = false;
            console.log("Symptom function is called " + sym);

            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).update({
                "symptoms": $scope.arrayOFSym
            });
        }

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);


        $scope.stats = function(doctor){
            console.log("Stats function is called " + doctor);

            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).update({
                "doctor": doctor
            });

            if(doctor == 'yes')
                $state.go('disease');

            if(doctor == 'no') {
                $state.go('map');
            }


        }


    })

    .controller('DiseaseCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, report, $state, $http) {
        // Set Header

        $http.get('js/diseases.json').then(function(response) {
            $scope.symptoms = response.data.diseases;
            console.log("symtopms "+ $scope.symptoms);
        }, function(response) {
            console.log("error :" +response.data);
            $scope.datam = response.data || "Request failed";
        });


        //report.id = "8d6c8af4-df12-f2e7-1a36-43f8b78d86c3";

        $scope.isExpanded = false;


        $scope.arrayOFSym = [];

        $scope.newValue = function(dis){
            $scope.arrayOFSym.push(dis);
            $scope.ageShown = false;
            console.log("Disease function is called " + dis);

            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).update({
                "initialDiagnosis": $scope.arrayOFSym
            });
        }

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);


        $scope.next = function(){

            $state.go('map');
        }


    })


    .controller('StatusCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, report, $state) {
        // Set Header

        //report.id = "8d6c8af4-df12-f2e7-1a36-43f8b78d86c3";

        $scope.isExpanded = false;


$scope.ageShown = true;
        $scope.newValue = function(age, allergies){
            $scope.ageShown = false;
            console.log("Age function is called " + age + allergies);

            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).update({
                "age": age,
                "allergies": allergies
            });
        }


        $scope.autoExpand = function(e) {
            var element = typeof e === 'object' ? e.target : document.getElementById(e);
            var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
            element.style.height =  scrollHeight + "px";
        };

        function expand() {
            $scope.autoExpand('TextArea');
        }

        $scope.showSmoker = false;
        $scope.newValue1 = function(gender){
            console.log("Gender function is called " + gender);

            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).update({
                "gender": gender
            });
        }

        $scope.weight="";
        $scope.height="";

        $scope.stats = function(smoker){
            console.log("Stats function is called " + smoker + document.getElementById("weight").value);


            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).update({
                "smoker": smoker,
                "weight": document.getElementById("weight").value,
                "height": document.getElementById("height").value
            });

            if(smoker == 'yes')
                $scope.showSmoker = true;

            if(smoker == 'no') {
                $scope.showSmoker = false;
                $state.go('symptom');
            }

        }

$scope.next = function(){
    var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
    ref.child(report.id).update({
        "smokingFreq": document.getElementById("dailyFreq").value
    });

    $state.go('symptom');
}

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

    })


.controller('ProfileCtrl', function($scope,$state, $timeout, ionicMaterialMotion, ionicMaterialInk, report,$stateParams) {
    // Set Header

    //$scope.isExpanded = false;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

   /* $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 400);*/

    // Set Ink
    ionicMaterialInk.displayEffect();


$scope.ColorFunction = function(color){
    console.log("Color function is called " + color);

    var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
    ref.child(report.id).update({
        "phlegm": color
    });

    $state.go('status');

}

})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, report, $state) {

    $scope.isExpanded = true;



        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }


        report.id = guid();


        $scope.lightCount = 0;
        $scope.medCount = 0;
        $scope.intenseCount = 0;


    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();



    $scope.Showing = false;
        $scope.labels = ["Light", "Medium", "Intense"];
        $scope.data = [
            [0, 0, 0]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        //$scope.colors = [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

        //$scope.coughType = "";

        $scope.IntensityCall = function(coughType) {
            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
            ref.child(report.id).set({
                "coughType": coughType
            });
            $scope.coughType = "" + coughType;
            //user.id = data;
            $scope.Showing = true;
            console.log("IntensityCall is called! " + coughType);



            var h1 = document.getElementsByTagName('h1')[0],
                start = document.getElementById('start'),
                stop = document.getElementById('stop'),
                clear = document.getElementById('clear'),
                seconds = 0, minutes = 0, hours = 0,
                t;

            function add() {
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours++;
                    }
                }

                h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

                timer();
            }
            function timer() {
                t = setTimeout(add, 1000);
            }
            timer();

        }

        $scope.HistCall = function(intensity) {
            console.log("HistCall is called! " + intensity);

            if(intensity == "light") {
                $scope.lightCount = $scope.lightCount + 1;
                $scope.data[0] = [$scope.lightCount, $scope.medCount, $scope.intenseCount];
                console.log("HistCall is called! " + $scope.data[0]);
            }

            if(intensity == "med") {
                $scope.medCount = $scope.medCount + 1;
                $scope.data[0] = [$scope.lightCount, $scope.medCount, $scope.intenseCount];
                console.log("HistCall is called! " + $scope.data[0]);
            }

            if(intensity == "intense") {
                $scope.intenseCount = $scope.intenseCount + 1;
                $scope.data[0] = [$scope.lightCount, $scope.medCount, $scope.intenseCount];
                console.log("HistCall is called! " + $scope.data[0]);
            }
        }


        $timeout(function() {

            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");

            ref.child(report.id).update({
                "light": $scope.lightCount,
                "medium": $scope.medCount,
                "intense": $scope.intenseCount
            });
            $state.go("profile");
        }, 10000);


//$scope.functionCall = function() {
//    var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
//    //$scope.currentReport = $firebaseObject(ref).child(reportid);
//    ref.child(report.id).update({
//        "light": $scope.lightCount,
//        "medium": $scope.medCount,
//        "intense": $scope.intenseCount,
//    });
//
//}
//
//        $scope.functionCall1 = function() {
//            var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");
//            ref.child(report.id).update({
//                "type": "whopping"
//            });
//            $state.go("map");
//        }

})

///####################################
    .controller('ListSymptomCtrl', function($scope,$sce, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,$http) {


        $http.get('js/symptom_W_videos2.json').then(function(response) {
            $scope.symptoms = response.data;
            console.log("symtopms "+ $scope.symptoms[0].symptom);
        }, function(response) {
            console.log("error :" +response.data);
            $scope.datam = response.data || "Request failed";
        });
        /*$scope.video=function(data){
            return if(data.video!='none');
        }*/
        // Activate ink for controller
        ionicMaterialInk.displayEffect();
        $timeout(function() {
            ionicMaterialMotion.blinds({selector:'.animate-blinds .item'});
        }, 100);

        $scope.convertURL = function(src) {
            var url = src.replace("watch?v=", "embed/");
            //return $sce.trustAsResourceUrl(url);
            console.log(url);
            return url;

        }
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
        $scope.isExpanded = true;







    })
    .controller('ReportMapCtrl', function($scope, $ionicLoading, $compile, report, $http, $state, $window){

        var count = 0;
        $scope.showButton = false;

        //report.id = "8d6c8af4-df12-f2e7-1a36-43f8b78d86c3";
        //function initialize() {
        var myLatlng = new google.maps.LatLng(24.493520, 54.379305);

        var mapOptions = {
            center: myLatlng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");

        $scope.firebaseData=[];
        var counterMarker=0;
        var myLatLng = {};
        var locationArray=[];

        var addMarker = function(res,index) {
            // if(this.marker) this.marker.setMap(null);


            var marker = new google.maps.Marker({
                map: map,
                position: res,
                animation: google.maps.Animation.DROP

            });

            google.maps.event.addListener(marker, 'click', function() {
                localStorage.setItem("Index", index);

                $state.go("report");

                // $window.location.href = 'templates/report.html';

            });


            //this.map.setCenter(res);
        }


        ref.on("child_added", function (snapshot){
            $scope.firebaseData.push(snapshot.val());


            //console.log($scope.firebaseData[counterMarker].currentLocation);

            if (!($scope.firebaseData[counterMarker].light==0 && $scope.firebaseData[counterMarker].medium==0 && $scope.firebaseData[counterMarker].intense==0))
            {
                if(!($scope.firebaseData[counterMarker].currentLocation==undefined)) {
                    var latit = parseFloat($scope.firebaseData[counterMarker].currentLocation.split(',')[0]);
                    var long = parseFloat($scope.firebaseData[counterMarker].currentLocation.split(',')[1]);
                    myLatLng = {lat: latit, lng: long};


                    //locationArray.push(myLatLng);

                    addMarker(myLatLng, counterMarker);

                }

            }

            counterMarker++;

        });


    })
    .controller('ReportCtrl', function($scope, $ionicLoading, $compile, report, $http, $state, $window){

        console.log('ReportCtrl Loaded');
        var index=localStorage.getItem("Index");
        console.log(index);
        $scope.firebaseData=[];

        function convertKelvinToCelsius(kelvin) {
            if (kelvin < (0)) {
                return 'below absolute zero (0 K)';
            } else {
                return (kelvin-273.15);
            }
        }

        var ref = new Firebase("https://healthxenvironment.firebaseio.com/reports");

        var counter=0;
        ref.on("child_added", function (snapshot) {
            $scope.firebaseData.push(snapshot.val());
            // console.log(index);

            if(counter==index) {
                console.log(counter);
                $scope.city=$scope.firebaseData[index].fromAPI1.name;
                $scope.country=$scope.firebaseData[index].fromAPI1.sys.country;
                $scope.date=$scope.firebaseData[index].timeStamp;
                $scope.age=$scope.firebaseData[index].age;
                $scope.gender=$scope.firebaseData[index].gender;
                $scope.height=$scope.firebaseData[index].height;
                $scope.weight=$scope.firebaseData[index].weight;
                $scope.smoker=$scope.firebaseData[index].smoker;
                $scope.smokingFreq=$scope.firebaseData[index].smokingFreq;
                $scope.phlegm=$scope.firebaseData[index].phlegm;
                $scope.coughType=$scope.firebaseData[index].coughType;

                $scope.labels = ['Light', 'Medium', 'Intense'];

                $scope.data = [
                    [$scope.firebaseData[index].light,$scope.firebaseData[index].medium, $scope.firebaseData[index].intense]
                ];

                $scope.allergies=$scope.firebaseData[index].allergies;
                $scope.symptoms=$scope.firebaseData[index].symptoms;
                $scope.doctor=$scope.firebaseData[index].doctor;

                if($scope.firebaseData[index].doctor=="Yes") {
                    $scope.diagnosis = $scope.firebaseData[index].initialDiagnosis;
                }
                else
                {
                    $scope.diagnosis=["No Diagnosis"];
                }

                $scope.weather=$scope.firebaseData[index].fromAPI1.weather[0].main;
                $scope.weatherDescription=$scope.firebaseData[index].fromAPI1.weather[0].description;

                var temp=$scope.firebaseData[index].fromAPI1.main.temp;
                temp=parseFloat(temp);

                $scope.temperature=parseFloat(convertKelvinToCelsius(temp)).toFixed(2);
                $scope.pressure=$scope.firebaseData[index].fromAPI1.main.pressure;
                $scope.windSpeed=$scope.firebaseData[index].fromAPI1.wind.speed;

                $scope.plants=$scope.firebaseData[index].fromAPI2[0].plant_count;

                $scope.humidity=$scope.firebaseData[index].fromAPI1.main.humidity;

                $scope.labels3 = ["Past", "Present", "Future"];
                $scope.series3 = ['Carbon Intensity'];
                $scope.data3 = [
                    [$scope.firebaseData[index].fromAPI2[0].intensity.past,$scope.firebaseData[index].fromAPI2[0].intensity.present, $scope.firebaseData[index].fromAPI2[0].intensity.future]
                ];

                $scope.labels2 = ['Past', 'Present', 'Future'];
                $scope.series2 = ['CO2 Emitted in Tons ', 'Consumed Energy in MWh'];

                $scope.data2 = [
                    [$scope.firebaseData[index].fromAPI2[0].carbon.past,$scope.firebaseData[index].fromAPI2[0].carbon.present, $scope.firebaseData[index].fromAPI2[0].carbon.future],
                    [$scope.firebaseData[index].fromAPI2[0].energy.past, $scope.firebaseData[index].fromAPI2[0].energy.present,$scope.firebaseData[index].fromAPI2[0].energy.future]
                ];


            }
            counter++;
        });




    })
;
