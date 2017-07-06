(function(global, $){
    'use strict';
    var document = global.document;
    var json_url, review_data;
    
    function init(){
        json_url = 'https://api.myjson.com/bins/18q7v3';
        load();
    }
    function load(){
        $.get(json_url, function(review, status){
            if (status === 'success'){
                review_data = Array.isArray(review.data)? review.data : [];
            }
            render();
        });
    }
    function render(){
        var review_html = '';
        review_data.forEach(function(value, index){
            review_html  += '<article>'+
                '<h2>'+ value.title +'</h2>' +
                '<p>'+ value.content +'</p>'+
                '<a href="delete" data-index="'+index+'" class="delete-review">리뷰삭제</a>'+
                '</article>';
        });
        if(review_html===''){
            review_html = '<div class="no-list-icon"></div>' +
            '<div class="no-list">등록된 리뷰가 없습니다.</div>';
        }
        $('.review-list').html(review_html);
    }
    
    function openReviewWrite(){
        $('.write-review').addClass('open');
        $('.form').css('display','block');
        $('#review-title').focus();
    }
    function closeReviewWrite(){
        $('.write-review').removeClass('open');
        $('.form').css('display','none');
    }

    function putReviewData(){
        var new_data = JSON.stringify({ "data": review_data });
        $.ajax({ 
            method: 'PUT',
            url: json_url,
            data: new_data,
            contentType:'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data, status){
                load();
            }
        });
    }

    $(global).scroll(function(){
        if (global.scrollY > 500){
            $('.nav-wrap').addClass("scroll-top");
        } else {
            $('.nav-wrap').removeClass("scroll-top");
        }
    }); 

    $('.review-list').on('click', function(e){
        var target = e.target;
        if($(target).hasClass('delete-review')){
            review_data.splice(e.target.dataset.index,1);
             putReviewData();
        }
        e.stopPropagation();
        e.preventDefault();
    });
    $('.reservation-menu-wrap').on('click', function(e){
        if ($('.reservation-menu').hasClass('pop-up-on')){
            $('.reservation-menu').removeClass('pop-up-on').addClass('pop-up-off');
        } else {
            $('.reservation-menu').addClass('pop-up-on').removeClass('pop-up-off');
        }
        e.preventDefault();
    });

    $('.write-review').on('click', function(e){
       if($(this).hasClass('open')){
            closeReviewWrite();
       }else{
            openReviewWrite();
       }
        e.preventDefault();
    });

    $('.btn-write').on('click', function(e){
        //등록버튼 클릭시
        // 1. 제목, 내용 vaildate
        if($('#review-title').val().trim() === ''){
            global.alert('리뷰 제목을 입력하세요');
            $('#review-title').focus();
        }else if($('#review-title').val().trim() === ''){
            global.alert('리뷰 내용을 입력하세요');
            $('#review-content').focus();
        }else{
            review_data.push({
                "title": $('#review-title').val(),
                "content": $('#review-content').val()
            });
            putReviewData();
            $('#review-title').val('');
            $('#review-content').val('');
        }
        e.preventDefault();
    });


    init();
})(window, window.jQuery);

