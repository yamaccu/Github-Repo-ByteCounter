export default function handler(req, res) {
    const { name = 'World' } = req.query;
//    return res.send(`Hello ${name}!`);

      return res.send(`
      <style>
      .bar-graph-wrap {
        position: relative;
        height: 350px;
        -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
      }
      .bar-graph-wrap .graph {
        height: 50px;
        position: absolute;
        left: 0;
        border-radius: 0 4px 4px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
        padding: 10px;
        -webkit-animation: graphAnim 0.5s forwards;
                animation: graphAnim 0.5s forwards;
      }
      .bar-graph-wrap .graph span {
        font-size: 14px;
        color: #ffffff;
      }
      @media screen and (max-width: 750px) {
        .bar-graph-wrap .graph span {
          font-size: 12px;
        }
      }
      .bar-graph-wrap .graph.blue {
        top: 15%;
        background: #03a9f4;
        width: 88%;
      }
      .bar-graph-wrap .graph.red {
        top: 0;
        bottom: 0;
        margin: auto;
        background: #ff3051;
        width: 65%;
      }
      .bar-graph-wrap .graph.green {
        bottom: 15%;
        background: #1fd26c;
        width: 27%;
      }
      
      @-webkit-keyframes graphAnim {
        0% {
          -webkit-transform: translateX(-100%);
                  transform: translateX(-100%);
        }
        100% {
          -webkit-transform: translateX(0);
                  transform: translateX(0);
        }
      }
      
      @keyframes graphAnim {
        0% {
          -webkit-transform: translateX(-100%);
                  transform: translateX(-100%);
        }
        100% {
          -webkit-transform: translateX(0);
                  transform: translateX(0);
        }
      }


      </style>
      
      <div id="bar-graph" class="content">
        <h2 class="c-title">棒グラフ</h2>
        <div class="bar-graph-wrap">
          <div class="graph blue">
            <span class="name">Graph 01</span>
            <span class="number">88%</span>
          </div>
          <div class="graph red">
            <span class="name">Graph 02</span>
            <span class="number">65%</span>
          </div>
          <div class="graph green">
            <span class="name">Graph 03</span>
            <span class="number">27%</span>
          </div>
        </div>
      </div>
      `);
}