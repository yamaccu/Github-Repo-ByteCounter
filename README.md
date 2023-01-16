## Repositories Bytes Counter

githubアカウント内のレポジトリの、使用言語ごとのbyte数を集計して表示します。  
forkしたレポジトリは除いています。  

<br>

## 使い方(how to use)

下記のコードを、username=の後を自分のアカウントに変更してコピペします。  
また、リンク先は本レポジトリになっているので、変えたい方は自分のアカウントURL等に変更ください。  

```
MarkDown
[![GitHub repoBytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu)](https://github.com/yamaccu/Github-Repo-ByteCounter)

HTML
<a href="https://github.com/yamaccu/Github-Repo-ByteCounter"><img alt="github bytes" src="https://github-repo-bytecounter.vercel.app/api?username=yamaccu"></a>
```

トップ4のbyte数が横棒グラフで表示されます。  
byte数によって色分けされ、byte数が多い方が濃い色になります。  

| bytes | color |
| --- | --- |
| < 100,000 | blue |
| < 1,000,000 | green |
| >= 1,000,000 | red |


[![GitHub repoBytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu)](https://github.com/yamaccu/Github-Repo-ByteCounter)

<br>

## オプション(option)

対象外としたいレポジトリは、下記のように"exclude"で指定できます。  

```
MarkDown
[![GitHub repoBytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu&exclude=yamaccu.github.io,Blazor-CharjsTest)](https://github.com/yamaccu/Github-Repo-ByteCounter)

HTML
<a href="https://github.com/yamaccu/Github-Repo-ByteCounter"><img alt="GitHub repoBytes" src="https://github-repo-bytecounter.vercel.app/api?username=yamaccu&exclude=yamaccu.github.io,Blazor-CharjsTest"></a>
```

[![GitHub repoBytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu&exclude=yamaccu.github.io,Blazor-CharjsTest)](https://github.com/yamaccu/Github-Repo-ByteCounter)

<br>

## リンクの生成ページ

以下のページで、リンクURLを生成できますので、宜しければ使用ください。  

[リンクURL作成ページ](https://yamaccu.github.io/app/20230114_github-bytesprogrammed)

## 謝辞

以下のレポジトリを参考にさせてもらいました。  
有名なのでご存じかもしれませんが、お勧めのwebプロダクトですので是非参照してみてください。  

[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
