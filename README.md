## Repositories Bytes Counter

githubアカウント内のレポジトリの、使用言語ごとのbyte数を集計して表示します。  
forkしたレポジトリは除いています。  

<br>

## 使い方(how to use)

下記のコードを、username=の後を自分のアカウントに変更してコピペします。  

```
[![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu)](https://github.com/yamaccu/Github-Repo-ByteCounter)
```

すると、トップ4のbyte数が横棒グラフで表示されます。  
byte数によって色分けされ、byte数が多い方が濃い色になります。  

| bytes | color |
| --- | --- |
| < 100,000 | blue |
| < 1,000,000 | green |
| >= 1,000,000 | red |


[![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu)](https://github.com/yamaccu/Github-Repo-ByteCounter)

<br>

## オプション(option)

対象外としたいレポジトリは、下記のように"exclude"で指定できます。  

```
[![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu&exclude=yamaccu.github.io,Blazor-CharjsTest)](https://github.com/yamaccu/Github-Repo-ByteCounter)
```

[![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu&exclude=yamaccu.github.io,Blazor-CharjsTest)](https://github.com/yamaccu/Github-Repo-ByteCounter)

<br>

## 謝辞

以下のレポジトリを参考にさせてもらいました。  
有名なのでご存じかもしれませんが、お勧めのwebプロダクトですので是非参照してみてください。  

[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
