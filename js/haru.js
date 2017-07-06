(function(global, $){
    'use strict';
    var document = global.document;
    var json_url, review_data, template, title, content, new_review, new_data, index;

    function init(){
      json_url = "https://api.myjson.com/bins/18q7v3";
      render();
    }

    function render(){
      $.get(json_url, function(review){
        template = '';
        review_data = review.data;
        if(Array.isArray(review_data) === true && review_data.length > 0){
          review_data.forEach(function(o, index){
            title = o.title;
            content = o.content;
            index = index;
            template += 
              '<article>' + 
                '<h2>'+ title +'</h2>' + 
                '<p>'+ content +'</p>' + 
                '<a data-index="'+ index +'" href class="btn-close"></a>'+
              '</article>'
            $('.review-list').html(template);
          });
        } else {
          review_data = [];
          template += 
            '<div class="no-list-icon"></div>' +
            '<div class="no-list">등록된 리뷰가 없습니다.</div>';
          $('.review-list').html(template);
        }
      });
    }

    function dataUpdate(){
      new_data = JSON.stringify({
          "data": review_data
        });
        $.ajax({
          url: json_url,
          dataType: 'json',
          method: 'PUT',
          data: new_data,
          contentType: 'application/json; charset=utf-8;',
          success: function(new_data){
            render();
          }
        });
    }

    $('.review-list').on('click', function(e){
      if(e.target.localName === 'a'){
        review_data.splice(e.target.dataset.index, 1);
        console.log('array', review_data);
        dataUpdate();
      }
      e.stopPropagation();
      e.preventDefault();
  
    });

    $('.btn-write').on('click', function(e){
        //등록버튼 클릭시
        // 1. 제목, 내용 vaildate
        if ($('#review-title').val().trim() === ''){
          global.alert('리뷰 제목을 입력 해 주세요.');
          $('#review-title').focus();
        } else if ($('#review-content').val().trim() === ''){
          global.alert('리뷰 내용을 입력 해 주세요.');
          $('#review-content').focus();
        } else {
          // 2. array push
          review_data.push({
            title: $('#review-title').val(),
            content: $('#review-content').val()
          })
          dataUpdate();
          $('#review-title').val('');
          $('#review-content').val('');
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

    function openReviewWrite(){
        $('.write-review').addClass('open');
        $('.form').css('display','block');
        $('#review-title').focus();
    }
    function closeReviewWrite(){
        $('.write-review').removeClass('open');
        $('.form').css('display','none');
    }

    
    $(global).scroll(function(){
      if (global.scrollY > 500){
        $('.nav-wrap').addClass("scroll-top");
      } else {
        $('.nav-wrap').removeClass("scroll-top");
      }
    });

    $('.reservation-menu-wrap').on('click', function(){
      if ($('.reservation-menu').hasClass('pop-up-on')){
        $('.reservation-menu').removeClass('pop-up-on').addClass('pop-up-off');
      } else {
        $('.reservation-menu').addClass('pop-up-on').removeClass('pop-up-off');
      }
    });

    init();

})(window, window.jQuery);