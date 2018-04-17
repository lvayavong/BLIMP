import axios from "axios";
import filterParams from "./filterParams";

export default {
  // Gets articles from the NYT API
  getArticles: function(params) {
    return axios.get("/api/ibt", { params: filterParams(params) });
  },
  // Gets all saved articles
  getSavedArticles: function() {
    return axios.get("/api/scraper");
  },
  // Deletes the saved article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/scraper/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/scraper", articleData);
  }
};
