<template>
    <div class="col-sm-2">
        <div class="card my-4">
            <div class="card-body">
                <div class="row">
                    <ul class="list-unstyled mb-0">
                        <li>
                            <router-link to="/dashboard" class="btn">
                                <i class="fa fa-list"></i> Список постов
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard-categories" class="btn">
                                <i class="fa fa-archive"></i> Категории
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/slideredit" class="btn">
                                <i class="fa fa-archive"></i> Слайдер
                            </router-link>
                        </li>
                    </ul>           
                </div>
            </div>
        </div>
    </div>
</template>
