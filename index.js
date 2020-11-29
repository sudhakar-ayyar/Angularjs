var app = angular.module("myApp", []);
app.controller('AppController', function($scope){
	$scope.lists = []
	$scope.create_list = function(){
		$scope.lists.push({'ln': 'list'+($scope.lists.length+1), 'cards': [], 'index':$scope.lists.length})
		//console.log($scope.lists)
	}
    $scope.remove_list = function(list){
		var splice_index = -1
		console.log('ddddddd', list, $scope.lists)
		for(var i=0,l=$scope.lists.length;i<l;i++){
			console.log($scope.lists[i]['index'], list['index'])
			if($scope.lists[i]['index'] === list['index']){
				splice_index = i
				break
			}
		}
		console.log(splice_index)
		if(splice_index == -1)
			return '' 
		$scope.lists.splice(splice_index,1 )
	}
	$scope.add_card = function(cards,list){
		var card_len = cards.length
		cards.push({'title': 'Card Title'+(card_len+1), 'des': 'Descrption for card'+(card_len+1), 'comments': [], 'comment':'', 'index': card_len})
		$scope.sl_card = cards[card_len]
		$scope.sl_list = list
	}
	$scope.add_card_comment = function(card){
		if(card['comment']){
		    card['comments'].push(card['comment'])
			card['comment']= ''
		}else{
		   alert('Enter comment')	
		}
	}
	$scope.select_card =  function(list,card){
		$scope.sl_card = card
		$scope.sl_list = list
	}
	$scope.drag_and_drop = function(){
		if(end_index == -1 && start_index == -1)
			return ''
		var t1 = angular.copy($scope.lists[start_index])
		var t2 = angular.copy($scope.lists[end_index])
		$scope.lists[start_index] = t2
		$scope.lists[end_index] = t1
		start_index = -1
		end_index = -1
	}
	$scope.remove_card = function(){
		var splice_index = -1
		for(var i=0, l = $scope.sl_list['cards'].length;i<l;i++){
			if($scope.sl_card['index'] === $scope.sl_list['cards'][i]['index']){
				splice_index = i
			   break	
			}
		}
		console.log(splice_index, $scope.sl_list,$scope.sl_card )
		if(splice_index == -1)
			return ''
	    $scope.sl_list['cards'].splice(splice_index, 1)
		$scope.sl_card= {}
	}
	window.allowDrop = function(ev) {
       ev.preventDefault();
    }
     var start_index=-1;
    window.drag = function(ev) {
		//console.log(ev, ev.currentTarget)
      var tt = ev.currentTarget.getAttribute('info')
	  start_index = tt 
    }
     var end_index=-1;
    window.drop = function(ev) {
      ev.preventDefault();
	  var tt = ev.currentTarget.getAttribute('info')
	  end_index = tt 
	  $scope.$apply(function(){	  $scope.drag_and_drop()})
       
    }
})
