(function() {
    'use strict';

    angular
        .module('app', ['LocalStorageModule'])
          .controller('AppController',function ($http, $window, localStorageService){

            var vm = this;
            vm.updateStorage = updateStorage;
            vm.addTodo = addTodo;
            vm.clearCompleted = clearCompleted;

            initTodos();

            /**
             * Inits the todos
             */
            function initTodos(){
                var firstData = [
                    {
                    title: 'make a todo ng-app',
                    datetime: '15/02/2016 at 16:40PM',
                    done: true
                    }
                ];
                vm.todos = getItem('todosArray') ? getItem('todosArray') : firstData;
                vm.updateStorage();
            }

            /**
             * Adds a todo
             */
            function addTodo(){

              $http({
                method: 'POST',
                url: 'http://sysgarage.com/introductory-course-1/fake-api-post.php',
              }).then(function(obj) {

                vm.todos = getItem('todosArray');
                vm.todos.push({
                  title: vm.newTodo,
                  datetime: new Date(obj.data.datetime).toISOString(),
                  done: false
                });
                vm.newTodo = '';
                vm.updateStorage();
              })
              .catch(function(err){

                vm.todos = getItem('todosArray');
                vm.todos.push({
                  title: vm.newTodo,
                  datetime: Date().toISOString(),
                  done: false
                });
                vm.newTodo = '';
                vm.updateStorage();
              });
            }

            /**
             * Removes completed todos
             */
            function clearCompleted(){
              vm.todos = vm.todos.filter(function(item){
                return !item.done;
              });
              vm.updateStorage();
            }

            /**
             * Updates the local storage with the todos
             */
            function updateStorage(){
              //$window.localStorage.setItem('vm.todos', JSON.stringify(vm.todos));
                return localStorageService.set('todosArray', vm.todos);
            }

            function getItem(key) {
              return localStorageService.get(key);
            }

          });

})();
