$(document).ready(function() {
           function same(pwd) {  
                var oldPwd = $('input[name="password"]').val();  
                if (oldPwd == pwd)  
                    return false;  
                else  
                    return true;  
            } 
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
    }, "请填写正确的手机号码。");
	jQuery.validator.addMethod("same", function(value, element) {  
                return this.optional(element) || same(value);  
            }, "新密码和原密码相同");  
  
	jQuery.validator.addMethod("regexPassword", function(value, element) {  
		return this.optional(element) || /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);  
	}, "密码须为英文字母或数字");
  
  
	$('#myIphone').mouseover(function() {
        $('#myIphone').attr('src', 'img/iphone-download-select.png');
    }).mouseout(function() {
        $('#myIphone').attr('src', 'img/iphone-download.png');
    });
    $('#myAndroid').mouseover(function() {
        $('#myAndroid').attr('src', 'img/android-download-select.png');
    }).mouseout(function() {
        $('#myAndroid').attr('src', 'img/android-download.png');
    });
			
	$('.selectpicker').change(function()
	{
		$(this).parent('.form-group').find('label.error').hide();
	});
	
	$('#verifycode').bind('focus',function()
	{
		$('#verifycodeLabel').hide();
	});
	
	//初始化显示大学生
	$('#graduate-school').html('在读院校');
	$('#highest-education').html('在读学历');
	$('.full-time').hide();

	 $('#status').change(function() {
                if ($(this).val() == '全职教师') {
					$('#graduate-school').html('毕业院校');
					$('#highest-education').html('最高学历');
					$('.full-time').show();
                } else if ($(this).val() == '在校大学生') {
					$('#graduate-school').html('在读院校');
					$('#highest-education').html('在读学历');
					$('.full-time').hide();
                }
        });

	
    $("#signupForm").validate({
        rules: {
            name: "required",
            phone:{"isMobile":true,"required":true},
            identity:"required",
            email:"required",
            graduateSchool:"required",
            graduateMajor:"required",
            schoolName:"required",
			password:
			{  
                    required: true,  
					rangelength: [8, 15],
            },  
			repassword: { required: true, rangelength: [6, 20], equalTo: "#password" } 
			
        },
        messages: {
            name: "请输入姓名",
            phone:{
                required:"请输入手机号"
            },
            identity:"请选择身份",
            email:"请输入邮箱",
            graduateSchool:"请输入毕业院校",
            graduateMajor:"请输入专业",
            schoolName:"请输入学校名称",
            verifycode:"请输入验证码",
			password:  
			{  
				required: '请输入新密码', 
				rangelength: "确认密码不能小于6个字符",  				
			},  
			repassword: {  
				required: "请输入确认密码",  
				rangelength: "确认密码不能小于6个字符",  
				equalTo: "两次输入密码不一致"  
			}
        }

    });
	
	var doRegist = function(){
		$.ajax({
			url: 'http://139.196.29.70/test/teacher/register.php',
			type: 'post',
			data: {
				telephone: $('input[name="phone"]').val(),
				password:$('input[name="password"]').val(),
				userName:$('input[name="name"]').val(),
				userSex:$('input[name="sex"]:checked').val(),
				deviceType:'web',
				type: '1',
			},
			success:function(data)
			{
				var json=$.parseJSON(data); 
				if(json.code=='200')
				{
					$.ajax({
						url: 'http://139.196.29.70/test/teacher/addProfileDetailInformation.php',
						type: 'post',
						data: {
							userID:json.data.user_id,
							status: $('select[name="status"]').val(),
							schoolCategory:$('select[name="schoolType"]').val(),
							schoolName:$('input[name="schoolName"]').val(),
							ifOpen:1,
							professional:$('select[name="professional"]').val(),
							teachingAge:$('select[name="teachingAge"]').val(),
							mostBachelor:$('select[name="mostBachelor"]').val(),
							degreeSchoolName:$('input[name="degreeSchoolName"]').val(),
							major:$('input[name="major"]').val()
						},
						success:function(data)
						{
							var json=$.parseJSON(data); 
							if(json.code=='200')
							{
								//最终注册成功
								$('#page1').hide();
								$('#page2').show();
								
							}
							else{
								$('.submitError').html( eval("'" + json.message + "'"));
								$('.submitError').show();
							}
						}
					});	
				}
				else{
					$('.submitError').html( eval("'" + json.message + "'"));
					$('.submitError').show();
				}
			}
		});	
	};
    $('#signupForm').submit(function(){
        $(this).ajaxSubmit({
            beforeSubmit:function(){
                //这里对特殊参数进行校验（验证码和下拉菜单）
				var flag=false;
				var fullTimeCheck=$('#status').val() == '全职教师';
                if(fullTimeCheck && $('select[name="schoolType"]').val().length<=0)
				{
					$('select[name="schoolType"]').parent('.form-group').find('label.error').show();
					flag=true;
				}
				if(fullTimeCheck && $('select[name="professional"]').val().length<=0)
				{
					$('select[name="professional"]').parent('.form-group').find('label.error').show();
					flag=true;
				}
				if($('select[name="teachingAge"]').val().length<=0)
				{
					$('select[name="teachingAge"]').parent('.form-group').find('label.error').show();
					flag=true;
				}
				if($('select[name="mostBachelor"]').val().length<=0)
				{
					$('select[name="mostBachelor"]').parent('.form-group').find('label.error').show();
					flag=true;
				}
				if(flag)
				{
					return false;
				}else
				{
					$.ajax({
						url: 'http://139.196.29.70/test/teacher/ifVerifyCodeRight.php',
						type: 'post',
						data: {
							telephone: $('input[name="phone"]').val(),
							verifyCode:$('input[name="verifyCode"]').val(),
							type: '1',
						},
						success:function(data)
						{
							var json=$.parseJSON(data); 
							if(json.code=='200')
							{
								doRegist();
							}
							else{
								$('#verifycodeLabel').html( eval("'" + json.message + "'"));
								$('#verifycodeLabel').show();
							}
						}
					});	
				}
                return false;
            },
            success:function(){
                alert('ccc');
            }
        });
        return false; //此处必须返回false，阻止常规的form提交
    });



    $('.selectpicker').selectpicker();

	$('#step2-submit').click(function(event) {
		var name = $('#name').val();
		var sex = $('input[name="sex"]:checked').val();
		var phone = $('#phone').val();
		var verifycode = $('#verifycode').val();
		var identity = $('#identity').val();
		var email = $('#email').val();
		var step2 = $(this).parent('div');
		var type = $(step2).attr('id');
		var is_licence_agreed = $('input#licence').get(0).checked;

		if (!is_licence_agreed) {
			alert("请同意条款");
			return;
		}



		var teach_age = $('#teach-age').val();
		var highest_education = $('#highest-education').val();
		if ("step2-type1" == type) {
			var school_name = $('#school-name').val();
			var school_type = $('#school-type').val();
			var teacher_title = $('#teacher-title').val();
			var graduate_school = $('#graduate-school').val();
			var graduate_major = $('#graduate-major').val();
			if (undefined == school_name || "" == school_name) {
				$('#school-name').parent('div').addClass('has-error');
				$('#school-name-error').removeClass('not-visible');
				return;
			}
			$.ajax({
				url: 'http://139.196.29.70/test/teacher/addProfileDetailInformation.php',
				type: 'post',
				data: {
					Status: $('#identity').val(),
					Siginiture: '',
					SchoolCategory: school_type,
					SchoolName: school_name,
					ifOpen: 1,
					professional: teacher_title,
					teachingAge: teach_age,
					mostBachelor: highest_education,
					degreeSchoolName: graduate_school,
					major: graduate_major,
					teachingPoint: '',
					achievement: '',
					honor: '',
					otherWork: ''
				}
			})
			.done(function() {
				$('img#step-img').attr('src', 'img/step3.png');
				$('span.step3-text').addClass('my-text-blue');
				$(step2).addClass('not-visible');
				$('div#step3').removeClass('not-visible');
				$('#step1').addClass('not-visible');
			})
			.fail(function() {
				alert("school_type : " + school_type + "\n" +
					"school_name : " + school_name + "\n" +
					"teacher_title : " + teacher_title + "\n" +
					"teach_age : " + teach_age + "\n" +
					"highest_education : " + highest_education + "\n" +
					"graduate_school : " + graduate_school + "\n" +
					"graduate_major : " + graduate_major);
				//测试用，ajax成功后删除
				$('img#step-img').attr('src', 'img/step3.png');
				$('span.step3-text').addClass('my-text-blue');
				$(step2).addClass('not-visible');
				$('div#step3').removeClass('not-visible');
				$('#step1').addClass('not-visible');
			});
		} else {
			var at_school_name = $('#at-school-name').val();
			var at_school_major = $('#at-school-major').val();
			$.ajax({
				url: 'index.html',
				type: 'post',
				data: {
					at_school_name: at_school_name,
					at_school_major: at_school_major,
					teach_age: teach_age,
					highest_education: highest_education,
				},
			})
			.done(function() {
				$('img#step-img').attr('src', 'img/step3.png');
				$('span.step3-text').addClass('my-text-blue');
				$(step2).addClass('not-visible');
				$('div#step3').removeClass('not-visible');
				$('#step1').addClass('not-visible');
			})
			.fail(function() {
				alert("at_school_name : " + at_school_name + "\n" +
					"at_school_major : " + at_school_major + "\n" +
					"teach_age : " + teach_age + "\n" +
					"highest_education : " + highest_education);
				//测试用，ajax成功后删除
				$('img#step-img').attr('src', 'img/step3.png');
				$('span.step3-text').addClass('my-text-blue');
				$(step2).addClass('not-visible');
				$('div#step3').removeClass('not-visible');
				$('#step1').addClass('not-visible');
			});
		}

	});

	$('#btn-getcode').click(function(event) {
		$.ajax({
			url: 'http://139.196.29.70/test/teacher/getVerifyCode.php',
			type: 'post',
            dataType: 'json',
            //jsonp:"callback",
            //jsonpCallback:"success2_jsonpCallback",
			data: {
				telephone: $('#phone').val(),
				type: 1
			},
            success:function(data)
            {
                var btn =$('#btn-getcode');                ;
                btn.attr('disabled', 'disabled');
                btn.html("重新获取(60s)");
                var count = 59;
                var countdown = setInterval(countDown, 1000);

                function countDown() {
                    $(btn).attr('disabled', 'disabled');
                    $(btn).html("重新获取(" + count + "s)");
                    if (count == 0) {
                        $(btn).html("获取验证码").removeAttr("disabled");
                        clearInterval(countdown);
                    }
                    count--;
                }
            }
		});

	});

//	$('input#school-name').on('input', function(event) {
//		if ("" != $(this).val()) {
//			$(this).parent('div').removeClass('has-error');
//			$('#school-name-error').addClass('not-visible');
//		};
//	});
//
//	$('img#iphone-dl').hover(function() {
//		$(this).attr('src', 'img/iphone-download-select.png');
//	}, function() {
//		$(this).attr('src', 'img/iphone-download.png');
//	});
//
//	$('img#android-dl').hover(function() {
//		$(this).attr('src', 'img/android-download-select.png');
//	}, function() {
//		$(this).attr('src', 'img/android-download.png');
//	});
//
//	$('#identity').change(function() {
//		if ($(this).val() == 0) {
//			$('#step2-type1').removeClass('not-visible');
//			$('#step2-type2').addClass('not-visible');
//		} else if ($(this).val() == 1) {
//			$('#step2-type2').removeClass('not-visible');
//			$('#step2-type1').addClass('not-visible');
//		}
//	});

});
