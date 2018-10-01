/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global ReactDOM */

class InputText extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>{this.props.label}</label>
                            <input className="form-control" placeholder={this.props.label} value={this.props.value}
                                   onChange={this.props.onChange}/>
                        </div>
                    </div>
                </div>
                );
    }
}

class Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="media">
                    <p className="pull-right">
                        <small>5 days ago</small>
                    </p>
                    <a class="media-left" href="#">
                        <img src={this.props.data.author.authorProfileImageUrl}/>
                    </a>
                    <div class="media-body">
                        <h4 class="media-heading user_name">{this.props.data.author.authorDisplayName}</h4>
                        {this.props.data.textDisplay}
                        <p>
                            <small><a href="">Like</a> - <a href="">Share</a></small>
                        </p>
                    </div>
                </div>
                );
    }
}

class ListComment extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var v = [];
        var items = this.props.items;
        if (items !== undefined && items !== null) {

            for (var i = 0; i < items.length; i++) {
                v.push(<Comment data={items[i]}/>);
                console.log("run: " + items[i].id);
            }
        }
        return (
                <div className="comments-list">
                    {v}
                </div>
                );
    }
}

class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
                <div>
                    <input className="form-control" value={this.props.info.title} placeholder="Link youtube"/>
                    <textarea className="form-control" row="10" value={this.props.info.description}></textarea>
                </div>
                );
    }
}

class FormGetYouTube extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="row">
                    <form role="form" onSubmit={this.props.onSubmit}>
                        <div className="col-lg-8">
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.props.onChange} placeholder={this.props.name}/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <button type="submit" className="btn btn-primary">Lấy thông tin</button>
                        </div>
                    </form>
                </div>
                );
    }
}

class FormDataYouTube extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="row" style="margin-top: 20px">
                <div class="col-lg-8">
                    <video width="100%" controls id="video">
                    </video>
                </div>
                <div class="col-lg-4">
                    <div class="list-thumb">
                        <div class="item">
                            <img class="imgsss" src="http://placehold.it/350x150"/>
                            <div class="tools">
                                <a href="#" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            </div>
                        </div>

                        <div class="item">
                            <img class="imgsss" src="http://placehold.it/350x150"/>
                            <div class="tools">
                                <a href="#" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            </div>
                        </div>

                        <div class="item">
                            <img class="imgsss" src="http://placehold.it/350x150"/>
                            <div class="tools">
                                <a href="#" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            </div>
                        </div>

                        <div class="item">
                            <img class="imgsss" src="http://placehold.it/350x150"/>
                            <div class="tools">
                                <a href="#" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            </div>
                        </div>

                        <div class="item">
                            <img class="imgsss" src="http://placehold.it/350x150"/>
                            <div class="tools">
                                <a href="#" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            </div>
                        </div>

                        <div class="item">
                            <img class="imgsss" src="http://placehold.it/350x150"/>
                            <div class="tools">
                                <a href="#" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" style="width: 100%">Chọn thumb</button>
                </div>
            </div>
            );
    }
}

class FormData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            link: '',
            value: '',
            items: [],
            nextPageToken: '',
            basicInfo: {},
            create_request: {categories: ["5a602b5f71b4380eed048197", "5a602b7a71b4380eed048198"]}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.getStreamLink = this.getStreamLink.bind(this);
        this.getBasicInfo = this.getBasicInfo.bind(this);
        this.getListComment = this.getListComment.bind(this);
        this.uploadClick = this.uploadClick.bind(this);
        this.uploadSuccess = this.uploadSuccess.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    getListComment(data) {
        console.log("nextPageToken: " + data.nextPageToken);
        var items = data.items;
        if (items !== null && items !== undefined && isArray(items)) {
            var comments = [];
            for (var i = 0; i < items.length; ++i) {
                var obj = items[i];
                var comment = {};
                var author = {};
                author.acc_id = obj.author.authorChannelId;
                author.acc_name = obj.author.authorDisplayName;
                author.acc_img = obj.author.authorProfileImageUrl;
                comment.author = author;
                comment.comment_source = 0;
                comment.comment = obj.textOriginal;
                comment.date = obj.updatedAt;
                comment.like = obj.likeCount;
                comment.dislike = 0;
                comment.reply = obj.totalReplyCount;
                comments.push(comment);
            }
            this.state.create_request.comments = comments;
        }
        this.setItems(items);
    }

    getStreamLink(data) {
        this.state.create_request.streamUrl = data.data;
        console.log("streamUrl = " + JSON.stringify(this.state.create_request));
    }

    getBasicInfo(data) {
        hideAllModal();
        let  thumbnails = data.thumbnails;
        if (thumbnails !== null && thumbnails !== undefined) {
            let thumb = [];
            for (let key in thumbnails) {
                let obj = {};
                if (thumbnails.hasOwnProperty(key)) {
                    obj.type = key;
                    obj.height = thumbnails[key].height;
                    obj.width = thumbnails[key].width;
                    obj.url = thumbnails[key].url;
                    thumb.push(obj);
                }
            }
            this.state.create_request.thumb = thumb;
        }

        this.state.create_request.name = data.title;
        this.state.create_request.typepost = 1;
        this.state.create_request.url = this.state.value;
        this.state.create_request.mediaStreamUrl = [];
        this.state.create_request.source = 0;

        this.state.create_request.share = 0;
        this.state.create_request.like = data.statistics.likeCount;
        this.state.create_request.dislike = data.statistics.dislikeCount;
        this.state.create_request.comment = data.statistics.commentCount;
        this.state.create_request.totalViews = data.statistics.viewCount;

        this.state.create_request.totalViews = data.displayContent;
        this.state.create_request.totalViews = data.statistics.viewCount;
        this.state.create_request.tags = data.tags;
        this.state.create_request.displayContent = data.description;
        this.state.create_request.originalContent = data.description;

        this.loadBasicInfo(data);
    }

    handleChange(event) {
        this.setState({link: event.target.value});
    }

    handleSubmit(event) {

        console.log('A link was submitted: ' + this.state.link);
        event.preventDefault();
        var link = this.state.link;
        if (!checkInputString(link)) {
            showDialog("Thông báo", "Vui lòng nhập link youtube");
            return false;
        }

        if (!isURL(link)) {
            showDialog("Thông báo", "Vui lòng nhập vào một link youtube");
            return false;
        }

// Basic info
        let params = {"u": link};
        let req = new Request();

// Lay basic info
        req.request("video/basic-info", params, this.getBasicInfo);

// Lay link stream
        req.requestNoModal("video/streaming", params, this.getStreamLink);

// Lay danh sach comment
        req.requestNoModal("video/comment", params, this.getListComment);

    }

    loadBasicInfo(info) {
        this.setState({basicInfo: info, displayForm: true});
    }

    loadCommentList(nextPageToken) {
        if (nextPageToken !== null && nextPageToken !== undefined) {

        }
    }

    setItems(items) {
        this.setState({items: items});
    }

    uploadClick() {
        console.log("upload = " + JSON.stringify(this.state.create_request));
        confirmDialog("Bạn muốn tạo nội dung này chứ", "Tạo mới", function () {
            var req = new Request();
            req.post("youtube-create", this.state.create_request, this.uploadSuccess);
        }.bind(this));
    }

    uploadSuccess(data) {
        if (parseInt(data.rc) === 0) {
            showDialog("Thông báo", "Tạo content thành công <br/>", null, this.resetState);
        } else {
            showDialog("Thông báo", "Tạo content thất bại <br/>" + data.rd);
        }
    }

    resetState() {
        this.setState({"value": ""});
        this.setState({"basicInfo": {}});
        this.setState({"items": []});
    }

    render() {
        const displayForm = this.state.displayForm;
        if (!displayForm) {
            return (
                    <FormGetYouTube onSubmit={this.handleSubmit} name="Youtube URL ..." onChange={this.handleChange}/>
                    );
        } else {
            return (
                    <FormDataYouTube />

                    );
        }

    }
}

ReactDOM.render(
        <FormData />,
        document.getElementById('root')
        );