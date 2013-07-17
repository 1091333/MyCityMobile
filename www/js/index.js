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
        //this.bindEvents();
        this.buildListviewTravels();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var page = document.getElementById("pageMyTravels");
        var listeningElement = page.querySelector('.listening');
        
        var receivedElement = page.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // build list travels
    buildListviewTravels: function(){
        
        // example
        var listTravels=new Array(); 
            listTravels[0]=['Ferias','img/travel.png','ferias de verao','12 Agosto 2013'];       
            listTravels[1]=['Porto','img/travel.png','visita cidade porto', 'Julho 2014'];
            listTravels[2]=['Cinema','img/travel.png', 'ida ao cinema', '22:40 PM'];
    
        var ullistViewTag = document.getElementById("listviewTravels");
        
        
        
        for(i=0; i<listTravels.length; i++){

            var liTag = document.createElement('li');
            liTag.setAttribute('data-split-icon', "gear");
            liTag.setAttribute('id', listTravels[i]);
            ullistViewTag.appendChild(liTag);
            
            var aTag = document.createElement('a');
            aTag.setAttribute('href', '#' +listTravels[i][0]);
            liTag.appendChild(aTag);
            
            var imgTag = document.createElement('img');
            imgTag.setAttribute('src', listTravels[i][1]);
            aTag.appendChild(imgTag);
            
            var h3Tag = document.createElement('h3');
            var h3Tx =document.createTextNode(listTravels[i][0]);
            h3Tag.appendChild(h3Tx);
            aTag.appendChild(h3Tag);
            
            var pTag = document.createElement('p');
            pTag.setAttribute('class', "ui-li-desc");
            var pTx =document.createTextNode(listTravels[i][2]);
            pTag.appendChild(pTx);
            aTag.appendChild(pTag);
           
            var ptTag = document.createElement('p');
            ptTag.setAttribute('class', "ui-li-aside");
            var tTx = document.createTextNode(listTravels[i][3]);
            ptTag.appendChild(tTx);
            liTag.appendChild(ptTag);
        /*
            var aGearTag = document.createElement('a');
            aGearTag.setAttribute('href', 'lists-split-' +listTravels[i][0] + '.html');
            aGearTag.setAttribute('data-rel', 'dialog' );
            aGearTag.setAttribute('data-transition', 'slideup' );
            
            liTag.appendChild(aGearTag);
        */

        }
    }
};
