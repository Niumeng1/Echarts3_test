echarts.util.mapData.params.params.ziyuan= 
{
    getGeoJson: function (callback) 
	{
        $.ajax({
            url: "../svg/new_bg_yindao.svg",
            dataType: 'xml',
            success: function(xml) 
			{
                callback(xml)
            }
        });
    }
}
var option = {
    color: ['gold','aqua','lime'],
    tooltip : 
	{
        trigger: 'item',
        formatter: '{b}({c})',
		showContent:'true'
    },
    series : [
        {
            name: '全部',
            type: 'map',
            roam: false,
            hoverable: false,
            mapType: 'ziyuan',
            itemStyle:{
                normal:{
                    borderColor:'rgba(100,149,237,1)',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#1b1b1b'
                    }
                }
            },
            data:[],
            markLine : {
                smooth:true,
                clickable:false,
                symbol: ['none', 'circle'],  
                symbolSize : 1,
                itemStyle : {
                    normal: {
                        color:'#fff',
                        borderWidth:1,
                        borderColor:'rgba(30,144,255,0.5)'
                    }
                },
                data : [

                ]
            }
        }
    ]
};
var geoData = [
               '{x:600,y:270}',
               '{x:350,y:270}',
               '{x:600,y:520}',
               '{x:600,y:20}',
               '{x:415,y:110}',
               '{x:750,y:320}',
               '{x:380,y:375}',
			   '{x:510,y:360}',
               '{x:480,y:60}',
               '{x:380,y:175}',
				'{x:710,y:60}',
				'{x:795,y:175}',
				'{x:795,y:365}', 
				'{x:650,y:395}',
				'{x:715,y:465}',
				'{x:480,y:465}',
				'{x:750,y:290}',
				'{x:450,y:240}',
				'{x:670,y:150}',
				'{x:760,y:120}',
				'{x:850,y:270}',
				'{x:400,y:85}',
				'{x:400,y:285}',
				'{x:500,y:170}'
				];

var geoRecord="";
function getData()
{
  $.getJSON('../data/top20.json', function(resultData){
  var result = resultData;
    for(var i=0;i<result.length;i++)
    {
    var pointColor = '#FFFFFF';
    var pointSize = 10;
    if(result[i].name=='大数据管理中心')
    {
    pointColor = result[i].pointColor;
    pointSize = 20;
    }
    if(i==result.length-1)
    {
    geoRecord =geoRecord+"'"+result[i].name+"'"+':'+geoData[i];
    }
    else
    {
     geoRecord =geoRecord+"'"+result[i].name+"'"+':'+geoData[i]+',';
    }
      var targetData = [];
      if(typeof result[i].targetNodes!='undefined')
      {
        for(var j=0;j<result[i].targetNodes.length;j++)
        {
             var td = [{name:result[i].name},{name:result[i].targetNodes[j].name,value:result[i].targetNodes[j].sendSingleData}];
             targetData.push(td);
        }
      }
         var data = {
            name: result[i].name,
            type: 'map',
            mapType: 'ziyuan',
            data:[],
            markLine : 
          {
                    smooth:true,
                    clickable:false,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            borderWidth:1,
                            color:'#ff1217',
                            lineStyle: 
                    {
                    //color:'#0000EE',
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data : targetData
                       
                        /*[{name:result[i].name}, {name:'市监察局',value:100}],
                        [{name:result[i].name}, {name:'市经济信息化委',value:150}],
                        [{name:result[i].name}, {name:'市公安局',value:150}],*/
                    
                },
            markPoint : 
          {
            	seriesName:result[i].code,
                    symbol:'emptyCircle',
                    symbolSize:pointSize,
                    effect : {
                        show: false,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:false},
                            color:pointColor
                        },
                        emphasis: {
                            label:{position:'top'}
                        }
                    },
                    data : [
                          {name:result[i].name,code:result[i].code,value:[result[i].sendTotalData,result[i].recieTotalData]},
                    ]
                }
            };
            option.series.push(data);
          }
          geoRecord = "{"+geoRecord+"}";
          //alert(geoRecord);
          option.series[0].geoCoord=eval("(" + geoRecord + ")");
          var myChart = echarts.init(document.getElementById('main'));
           myChart.setOption(option);

        getsData();
        });
}

