# angular-starter

##Шаг четвертый - простое todo приложение 

- bootstrap
- создание своей директивы

### Директивы 
- возвращают {}
- template, templateUrl
- link - $scope, element, attrs
- restrict - 'AE'

Scope 
- не указывать - директива, грубо говоря, работает напрямую в области видимости контроллера. То есть все переменные контроллера равны переменным директивы. http://jsfiddle.net/vmBmq/
- scope = true - будет наследоваться. То есть поля, заданные в родительском scope будут отображаться и в scope директивы, но при этом все изменения будут локальны. http://jsfiddle.net/RUm25/
- scope = {} - @/=/&/</+

```
scope:{
      localVar1:"@attrName1",
      localVar2:"=attrName2",
      localVar3:"&attrName3"
}
```

или не указывать имя атрибута, тогда оно равно имени переменной

```
scope:{
      localVar1:"@", /*localVar1:"@localVar1" */
      localVar2:"=",  /*localVar2:"@localVar2" */
      localVar3:"&"  /*localVar3:"@localVar3" */
}
```

- @ - локальной переменной будет присвоено значение атрибута http://jsfiddle.net/4b4US/
- = -  в атрибуте передается уже не строчка, а имя некоторой переменной в текущем Scope. И локальная переменная будет напрямую с ней связана. http://jsfiddle.net/4b4US/
- & - атрибут содержит некое выражение http://jsfiddle.net/9h29R/
- < - одностороннее связывание - http://plnkr.co/edit/3G8ol0faUV3hzMUwDbMz?p=preview