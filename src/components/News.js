import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
      country: "in",
      pageSize: 6,
      category: "general",
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props);
    // console.log("I am a constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }
  async updateNews(){
      this.props.setProgress(10);
      const url =
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
      let data = await fetch(url);
      this.props.setProgress(35);
      let parsedData = await data.json();
      this.props.setProgress(70);
      console.log(parsedData);
      this.setState({ articles: parsedData.articles,
         totalResults: parsedData.totalResults,
         loading: false
       });
       this.props.setProgress(100);
    

  }
  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbb51d95b77c4b89ae5a09ee41f5a57d&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles,
    //    totalResults: parsedData.totalResults,
    //    loading: false
    //  });

    this.updateNews();
  }

  fetchMoreData =async ()=>{
    this.setState({page: this.state.page + 1})
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({ articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults,
     loading: false
   });
  }

  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  handlePreviousClick = async () => {
    // console.log("prev");

    // PROCESS 1
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbb51d95b77c4b89ae5a09ee41f5a57d&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ 
    //   articles: parsedData.articles, 
    //   page: this.state.page - 1,
    //   loading: false
    //    });

    //  PROCESS 2

    this.setState({page: this.state.page -1})
    this.updateNews();
   
  };
  handleNextClick = async () => {
    // console.log("next");
    // if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbb51d95b77c4b89ae5a09ee41f5a57d&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({ 
    //     articles: parsedData.articles, 
    //     page: this.state.page + 1, 
    //     loading: false
    //   });
    //   }
    this.setState({page: this.state.page + 1});
    this.updateNews();

    }
  render() {
    return (
      <>
      <h1 className="text-center" style={{margin: '30px'}}>NewsTree - TopHeadlines</h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imgUrl={element.urlToImage}
                  titleUrl={element.title}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>  
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark my-3"
            onClick={this.handlePreviousClick}
          >
            &larr;Previous
          </button>
          <button disabled={(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))}
            type="button"
            className="btn btn-dark my-3"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div> */}
        
        </>
    );
  }
}

export default News;
