import axios from "axios";

export const removeLink = id => {
  return {
    type: "REMOVE_LINK",
    id
  };
};

export const addLink = link => {
  return {
    type: "ADD_LINK",
    link
  };
};

export const changeStatus = status => {
  return {
    type: "CHANGE_STATUS",
    status
  };
};

export const requestStart = () => {
  return {
    type: "REQUEST_START"
  };
};

export const requestError = error => {
  return {
    type: "REQUEST_ERROR",
    error
  };
};

export const requestSuccess = () => {
  return {
    type: "REQUEST_SUCCESS",
  };
};
export const addTags = (id, tags) => {
  return {
    type: "ADD_TAGS",
    id,
    tags
  };
};
export const removeTag = (id, tag) => {
  return {
    type: "REMOVE_TAG",
    id,
    tag
  };
};



const FLICKR_API_KEY = process.env.REACT_APP_FLICKR_API_KEY;
const VIMEO_TOKEN = process.env.REACT_APP_VIMEO_TOKEN;

export function fetchPhotoInfos(photoId) {
  return (dispatch) => {
    async function fetchFlickr() {
      dispatch(requestStart());
      try {
        const photoInfos = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
        );
        const photoSizes = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
        );
        let linkInfos = photoInfos.data.photo;
        let dimensions = photoSizes.data.sizes.size.pop();
        let link = {
          id: "p" + linkInfos.id,
          url: linkInfos.urls.url[0]._content,
          title: linkInfos.title._content,
          author: linkInfos.owner.realname,
          date: new Date(linkInfos.dateuploaded*1000).toString().substring(4,15), //linkInfos.dateuploaded 
          // date: linkInfos.dateuploaded,
          width: dimensions.width,
          height: dimensions.height,
          tags: []
        };
        dispatch(requestSuccess());
        dispatch(addLink(link));
      } catch (error) {
        console.log(error);
        dispatch(requestError(error));
      }
    }
    fetchFlickr();
  }
}

export function fetchVideoInfos(videoId) {
  return (dispatch) => {
    async function fetchVimeo() {
      dispatch(requestStart());
      try {
        const videoInfos = await axios.get(`https://api.vimeo.com/videos/${videoId}?access_token=${VIMEO_TOKEN}`);  
        const linkInfos = videoInfos.data;   
        console.log(linkInfos);
        let link = {
            id: 'v'+videoId, 
            url: linkInfos.link,
            title: linkInfos.name,
            author: linkInfos.user.name,
            date: new Date(linkInfos.created_time).toString().substring(4,15),
            width: linkInfos.width,
            height: linkInfos.height,
            duration: new Date(linkInfos.duration*1000).toISOString().substring(11,19),
            tags: []
        }        
        dispatch(requestSuccess());
        dispatch(addLink(link));
      } catch (error) {
        console.log(error);
        dispatch(requestError(error));
      }
    }
    fetchVimeo();
  }
}