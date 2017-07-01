var questions=Array();
$(document).ready(function()
{   $(".label").css("color","black");
    $(this).ajaxStart(function()
    {
        $('.update_wait').css('display','block');
    });
    function getoo(type)
    {
        var oo=new Object;
        oo.type=type;
        oo.title="";
        oo.op=Array();
        return oo;
    }
    function getoop()
    {
        var oop=new Object;
        oop.title="";
        return oop;
    }
    $("#question_check").click(function()
    {
        var source=$("#target").find(".control-group.component");
        var question;
        source.each(function(index,element)
        {
            if($(element).find(":checkbox").length>0)
            {
                question=getoo(2);
                question.title=$(element).find("label.control-label.leipiplugins-orgname").text();
                var k=0;
                $(element).find("label.checkbox").each(function(ind,e)
                {
                    question.op[k]=getoop();
                    question.op[k++].title=$(e).text();
                });
            }
            else
            {
                question=getoo(1);
                question.title=$(element).find("label.control-label.leipiplugins-orgname").text();
                var k=0;
                $(element).find("label.radio").each(function(ind,e)
                {
                    question.op[k]=getoop();
                    question.op[k++].title=$(e).text();
                });
            }
            questions.push(question);
        });
        up();
    });
    function up()
    {
        var title=$("#title").val();
        $.post("addQuestion",
            {
                "question": title
            },
            function (data) {
                if (data.ret != -1) {
                    var questionid = data.ret;
                    questions.forEach(function (val, index, obj) {
                        $.post("addQuestion",
                            {
                                "questionitemtype": val.type,
                                "questionitem": val.title,
                                "questionid": questionid
                            },
                            function (data) {
                                if (data.ret != -1) {
                                    var questionitemid = data.ret;
                                    val.op.forEach(function (v, i, o) {
                                        $.post("addQuestion",
                                            {
                                                "option": v.title,
                                                "questionitemid": questionitemid
                                            },
                                            function (data) {
                                                if (data.ret != -1) {
                                                	window.location.href="http://localhost:3000/user/index/";
                                                }
                                                else {
                                                    alert("未知错误！");
                                                }
                                            }, "json");
                                    });
                                }
                                else {
                                    alert("未知错误！");
                                }
                            }, "json");
                    });
                }
                else {
                    alert("未知错误！");
                }
            }, "json");
        
    }
});
function cbchecked(that)
{
    var q=$(that).attr("data-q");
    var o=$(that).attr("data-o");
    checkboxs[q].op[o].check=checkboxs[q].op[o].check?false:true;
}
function rdchecked(that)
{
    var q=$(that).attr("data-q");
    var o=$(that).attr("data-o");
    $(radios[q].op).each(function(index,element)
    {
        radios[q].op[index].check=false;
    });
    radios[q].op[o].check=radios[q].op[o].check?false:true;
}
function load(vid,cid)
{
    qvid=vid;
    qcid=cid;
    $.post("ajax_searchvideo", 
    { 
        "vid":vid,
        "cid":cid
    },
    function(data)
    {
        $('.update_wait').css('display','none');
        if(data.ret!=-1)
        {
            var videoinfo=data.videoinfo;
            $('.media-left .media-object').attr('src',videoinfo.img);
            $('.media-body .media-heading').text(videoinfo.name);
            $('.media-body p').text(videoinfo.introduce);
        }
        else
        {
            alert("未知错误！");
        }
    }, "json");
}