var urlToHandler = "http://alfa.takeacity.com/agent/mytravel/";

var entID = 230;

function init(){
	$(document).ready(function(){
		getMainList(entID);
    });
}

/* ******************    limpar linhas da tabela    ****************** */
function clearElement(id){
    
    var tblItemByEntID = document.getElementById(id);
   
    /* limpar linhas da tabela */
    if(tblItemByEntID != null){
        while(tblItemByEntID.hasChildNodes())
        {
           tblItemByEntID.removeChild(tblItemByEntID.firstChild);
        }
    }
}

/* =======================================================================
                            #Get Item By EntID
======================================================================= */

function getMainList(entID)
{
    var divMainList = document.getElementById("MainList");
    
        /* pedido ajajx */
    var request = $.ajax({
        type: "POST",
        url: urlToHandler + "GetItemByEntIDNow.ashx?EntID=" + entID,
        contentType: "Aplication/json; charset=utf-8",
        responseType: "json",
            success: onComplete_GetMainListNow,
            error: onFail_GetMainList
    });
        
        /* Sucesso pedido ajax */
    function onComplete_GetMainListNow(result) {

        /* *****************    limpar item      ***************** */
        clearElement("Home");
 
        /* *****************      Mainlist       ***************** */
        for (var item in result.MainList){
            
            if(result.MainList[item].Style == "LastCity"){
                
                createCity(result.MainList[item]);
                
            } else if(result.MainList[item].Style == "Day"){
                
                createDay(result.MainList[item]);
                
            } else if(result.MainList[item].Style == "City"){
            
                createCity(result.MainList[item]);
                
            } else if(result.MainList[item].Style == "Item"){
                
                createItem(result.MainList[item]);
            }
        }
    };

        /* erro pedido ajax */
    function onFail_GetMainList(result) {
        
        if (result.status == 200){
            onComplete_GetMainListNow(result);
        } else
        {
            alert("Code error: "+ result.status + "<br>" + result.responseText);
            clearElement("MainList");
        }
    };
    
    /* criar div dia */
    function createDay(item){
        
        /* <div class="DateItem">May 16</div> */
        var div = document.createElement("div");
        div.setAttribute("class","DateItem");
 
        var txt = document.createTextNode(item.StartDate);
        div.appendChild(txt);
        divMainList.appendChild(div);
    }
    
    /* criar div cidade */
    function createCity(item){
       
        /* <div class="CityItem">Porto</div> */
        
        var div = document.createElement("div");
        div.setAttribute("class","CityItem");
 
        var txt = document.createTextNode(item.CityFrom);
        div.appendChild(txt);
        divMainList.appendChild(div);
    }
    
    /* criar div Item */
    function createItem(item){
        
        /* example:
                <div class="TravelItem">
                    <div class="SubItemTime">20:00</div>
                    <div class="SubItemTime">&nbsp;</div>
                    <div class="SubItemSymbol"><img alt="restaurant" src="images/restaurant.png"></div>
                    <div class="SubItemDescr">Restaurante A Tendinha</div>
                    <div class="SubItemSign"><img alt="down" id="detailItemIcon" src="images/down.png"></div>
                </div>
        */
        
        var div = document.createElement("div");
            div.setAttribute("class","TravelItem");
        
                /* div hora inicio */
            var divStartTime = document.createElement("div");
                divStartTime.setAttribute("class","SubItemTime");
                var txtStartTime = document.createTextNode(item.StartHour);
                divStartTime.appendChild(txtStartTime);
            div.appendChild(divStartTime);
        
                /* div hora fim */
            var divEndTime = document.createElement("div");
                divEndTime.setAttribute("class","SubItemTime");
                var txtEndTime = document.createTextNode(item.EndHour);
                divEndTime.appendChild(txtEndTime);
            div.appendChild(divEndTime);
        
                /* div simbolo */
            var divSymbol = document.createElement("div");
                divSymbol.setAttribute("class","SubItemSymbol");
                
                    /*img simbolo */
                var symbolImg = document.createElement("img");
                    symbolImg.setAttribute("alt",item.Item);
                    symbolImg.setAttribute("src","images/"+item.Item+".png");
                divSymbol.appendChild(symbolImg);
            div.appendChild(divSymbol);
        
                /* div descricao item */
            var divDescr = document.createElement("div");
                divDescr.setAttribute("class","SubItemDescr");
     
                var txtDescr = document.createTextNode(item.ItemDescr);
                divDescr.appendChild(txtDescr);
            div.appendChild(divDescr);
        
                /* div detalhe item */
            var divDetail = document.createElement("div");
                divDetail.setAttribute("class","SubItemSign");
              
                    /*img simbolo */
                var detailImg = document.createElement("img");
                    detailImg.setAttribute("alt","down");
                    detailImg.setAttribute("id","detailItem_"+item.ItemID);
                    detailImg.setAttribute("src","images/down.png");
                divDetail.appendChild(detailImg);
            div.appendChild(divDetail);
        
        divMainList.appendChild(div);
    }
    
    
}