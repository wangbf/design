
	// ES通用查询接口
	function queryData(queryUrl,queryBuilder){		
		$.ajax({
				type:"post",
				url:queryUrl,//查询ES的URL
				data:queryBuilder,//查询ES的条件
				async: false,
				cache: false,
				beforeSend:function(){
					    //$("#dialog2" ).dialog( "open" );
				},
				success:function(result){
					callResult(result);
					//$( "#dialog2" ).dialog( "close" );					
				},
				error:function(){
				    //$( "#dialog2" ).dialog( "close");					    
				    //$( "#dialog4" ).dialog( "open" );
				    //$(".ui-icon.ui-icon-closethick").hide();
				}
			});
	}
	
	//通用ajax查询回调函数
	var queryResult=new Array();
	function callResult(result){
		result=result.hits.hits;
		for(var i=0;i<result.length;i++){
			queryResult[i]=result[i]._source;
			console.info(JSON.stringify(result[i]._source)+".........."+i);
		}
				
	}
	
	
	//ES封装订单查询条件
	function queryForList(){
		
		/******一: 请求参数******/		
		var queryMust=new Array();
		if(typeof(mustParams) != "undefined"){
		   //1:must term查询		   
		   if(typeof(mustParams.term)!= "undefined"){
		      var mustTerm = mustParams.term;
		      for (var key in mustTerm){ 
			       var  jsonstr="{\"term\":{\""+key+"\":\""+mustTerm[key]+"\"}}";
			       var  obj=JSON.parse(jsonstr);
			       queryMust.push(obj);
				   //console.info(key+"......."+mustTerm[key]);
			  }
		   }
		   
		   //2:must queryString查询
		   if(typeof(mustParams.query_string) != "undefined"){
			  var mustString={};
		      mustString.query_string = mustParams.query_string;
		      queryMust.push(mustString);
		   }
		   
		   //3:must range查询
		   if(typeof(mustParams.range) != "undefined"){
			  var mustRange=mustParams.range;
			  for (var key in mustRange){ 
			       var  jsonstr="{\"range\":{\""+key+"\":"+JSON.stringify(mustRange[key])+"}}";
			       var  obj=JSON.parse(jsonstr);
			       queryMust.push(obj);
				   //console.info(jsonstr);
			  }			  
		   }
		   
		  //4:must terms查询(inQuery)	   
		   if(typeof(mustParams.terms)!= "undefined"){
		      var mustTerms = mustParams.terms;
		      for (var key in mustTerms){ 
			       var  jsonstr="{\"terms\":{\""+key+"\":["+mustTerms[key]+"]}}";
			       var  obj=JSON.parse(jsonstr);
			       queryMust.push(obj);
				   //console.info(key+"......."+mustTerms[key]);
			  }
		   }
	    }
		
		else{
		   //默认全查
		   matchAll={};
		   matchAll.match_all={};
		   queryMust.push(matchAll);
		}
		
		//5：mustnot term查询
		var queryMustNot=new Array();
		if(typeof(mustNotParams) != "undefined"){
			var mustNotTerm=mustNotParams.term;
			for (var key in mustNotTerm){ 
			       var  jsonstr="{\"term\":{\""+key+"\":\""+mustNotTerm[key]+"\"}}";
			       var  obj=JSON.parse(jsonstr);
			       queryMustNot.push(obj);
				   //console.info(key+"......."+mustTerm[key]);
			}
		}
		
		//6：should term查询
		var queryShould=new Array();
		if(typeof(shouldParams) != "undefined"){
			var shouldTerm=shouldParams.term;
			for (var key in shouldTerm){ 
			       var  jsonstr="{\"term\":{\""+key+"\":\""+shouldTerm[key]+"\"}}";
			       var  obj=JSON.parse(jsonstr);
			       queryShould.push(obj);
				   //console.info(key+"......."+mustTerm[key]);
			}
		}
				
		//7:sort排序
		var querySort=new Array();
		if(typeof(sortParams) != "undefined"){
		   for(var key in sortParams){ 
			   var  jsonstr="{\""+key+"\":\""+sortParams[key]+"\"}";
		       var  obj=JSON.parse(jsonstr);
		       querySort.push(obj);   
		   }
		}
		
		//8:分页参数计算公式 from=(pageNo-1)*size
		var   from=0;
		var   size=1000;
		if(typeof(pageParams) != "undefined"){
			if(typeof(pageParams.numbers) != "undefined"){
			   from=(pageParams.numbers-1)*size;
			   size=pageParams.size;
			}
			else{
			   from=pageParams.from;
			   size=pageParams.size;
			}
		}
		
		/******二: 执行请求******/
		var queryBuilder='{"query":{"bool":{"must":'+JSON.stringify(queryMust)+',"must_not":'+JSON.stringify(queryMustNot)+',"should":'+JSON.stringify(queryShould)+'}},"from":'+from+',"size":'+size+',"sort":'+JSON.stringify(querySort)+',"facets":{}}';
		console.info(queryBuilder);
		queryData(queryUrl,queryBuilder);
		
		/******三: 异步返回结果******/
		return queryResult;			
	}
	
	
	$(function(){
	   queryForList();	
	});
	
	