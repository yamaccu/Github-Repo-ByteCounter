## github repositories bytes counter  

githubアカウント内のrepositoryの使用言語ごとのbyte数を集計して表示します。  
forkしたレポジトリは除いています。  

## 使い方

下記のコードを、username=の後を自分のアカウントに変更してコピペします。  

```
![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu)
```

すると、トップ4のbyte数が横棒グラフで表示されます。  
byte数によって色分けされ、byte数が多い方が濃い色になります。  

| bytes | color |
| --- | --- |
| < 100,000 | blue |
| < 1,000,000 | green |
| >= 1,000,000 | red |


![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu)


## オプション

対象外としたいレポジトリは、下記のように"exclude"で指定できます。  

```
![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu&exclude=yamaccu.github.io)
```

![bytes](https://github-repo-bytecounter.vercel.app/api?username=yamaccu&exclude=yamaccu.github.io
)

## 謝辞

以下のレポジトリを参考にさせてもらいました。  
有名なのでご存じかもしれませんが、素晴らしいサービスですので是非参照してみてください。  

[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)