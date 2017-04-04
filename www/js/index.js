/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        FCMPlugin.onTokenRefresh(function(token){
          saveToRemote(token);
        });
        FCMPlugin.getToken(function(token){
          saveToRemote(token);
        });
        
        FCMPlugin.onNotification(function(data){
          
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var saveToRemote = function(value){
  var base_url = "https://requestb.in/1cucqbg1";
  httpRequest(base_url + "?token=" + value, "GET", null);
};

var httpRequest = function(url, method, callBack){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200 && typeof(callBack) == "function") {
          var data = JSON.parse(xhttp.responseText);
          callBack(data);
        }
  };
  xhttp.open(method,url, true);
  xhttp.send();
}
