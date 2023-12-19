.. MPCPeresvet documentation master file, created by
   sphinx-quickstart on Wed Apr  5 18:51:09 2023.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. include:: <isonum.txt>

.. |br| raw:: html

   <br/>

Конфигуратор
============

**Конфигуратор** - отдельное приложение для работы с моделью технического объекта в платформе "МПК-Пересвет".
На данный момент поддерживается работа с данными сущностями: 
 - Объект
 - Тег
 - Тревога
 - Хранилище данных
Конфигуратор упрощает работу с платформой и позволяет осуществлять CRUD операции с узлами в иерархии.
Он использует стандартное API платформы и отправляет http запросы для реализации CRUD методов.

В качестве технологического стека был использован язык TypeScript и фреймворк Vue.

.. toctree::
   :maxdepth: 6
   :caption: Содержание:

   Используемые термины<terms>
   Инструкция<manual.rst>
   Режим отладки<debug.rst>

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
