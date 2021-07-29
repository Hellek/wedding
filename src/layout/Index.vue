<template>
	<div class="bg-color-base" style="position: relative; overflow-x: auto;">
		<MyDoodle/>
		<div
			id="intro"
			class="min-h-100vh d-flex justify-content-center align-items-end"
		>
			<div
				class="color-white text-center p-10 mb-10 border-radius-medium"
				style="position: relative;"
			>
				<div class="blurry" style="z-index: 1"/>
				<div class="text-size-1 px-4 line-height-compact" style="color: #23110d; position: relative; z-index: 2">МЫ ЖЕНИМСЯ<br>21 МАРТА 2020</div>
			</div>
		</div>

		<div class="d-flex justify-content-center align-items-center">
			<div style="max-width: 800px; position: relative;">
				<el-card class="mt-8 mx-4" style="z-index: 1">
					<div class="text-size-3 text-center mx-10">Часть I: ЗАГС</div>
					<p class="font-size-large">Наш корабль под названием "Любовь" отправляется в бухту под названием "Семья".</p>
					<p class="font-size-large">Стандартная процедура регистрации брака с маршем Мендельсона в старинном доме фон Дервизов, построенном во флорентийском стиле. В середине XX века в особняке был открыт первый Дворец бракосочетания. Приглашаем всех, кто хочет разделить с нами эти минуты.</p>
					<p class="font-size-large">Дворец бракосочетания № 1, Английской наб., 28. Начало в 11:30</p>
				</el-card>

				<el-card class="mt-8 mx-4" style="z-index: 1">
					<div class="text-size-3 text-center mx-10 line-height-compact">Часть II: ФУРШЕТ<br>«Наша маленькая итальянская свадьба»</div>
					<p class="font-size-large">Теплая непринужденная атмосфера, общение, танцы, музыка, вино и легкие закуски.</p>
					<p class="font-size-large">В программе вечера символическая свадебная церемония и мастер-класс от известной петербургской художницы. Все вместе будем рисовать большую картину. А почему итальянская свадьба узнаете, когда придете к нам.</p>
				</el-card>

				<el-card class="mt-8 mx-4" style="z-index: 1">
					<div class="text-size-3 text-center mx-10 line-height-compact">АДРЕС</div>
					<p class="font-size-large mb-4">Большой проспект Петроградской стороны дом 70-72 (Вход со стороны ул. Подковырова 5, чуть дальше магазина "Красное и Белое"). Квартира 44. Домофон - 4550. 3 этаж. Творческая студия Валерии Лошак</p>
					<img src="~Images/loshak.svg" style="max-width: 100px; margin: 0 auto; display: block;">
					<p class="font-size-large text-center">Начало в 18:00.</p>
				</el-card>

				<el-card class="mt-8 mx-4" style="z-index: 1">
					<div class="text-size-4 text-center line-height-compact">Дресс-код для гостей</div>
					<p class="font-size-large">
						<span>М - Классический костюм или жилет с рубашкой</span>
						<span><br>Ж - Коктейльное или вечернее платье</span>
					</p>
					<p class="font-size-large">Цветовая гамма нарядов: приглушенные фиолетовые оттенки, сиреневый, баклажан, серый, серо-белый, нежно-зеленый, фисташковый, оливковый, зеленый и все нюдовые оттенки.</p>

					<div class="d-flex flex-wrap justify-content-center">
						<div
							v-for="color in colors"
							:key="color"
							class="p-6 m-4"
							:style="`background-color: ${color}`"
						/>
					</div>
				</el-card>

				<el-card v-if="form.guest1 || form.guest2" class="mt-8 mx-4">
					<div v-if="isSend" class="text-size-4 text-center line-height-compact">😉 Мы получили ваше подтверждение! До встречи 😉</div>

					<template v-else>
						<div class="text-size-4 text-center line-height-compact mb-4">Подтвердите участие в празднике</div>

						<div class="px-5 d-flex justify-content-center align-items-center">
							<el-form
								ref="form"
								:model="form"
							>
								<div class="mb-3 mt-5">Я, {{ form.guest1 }}, торжественно клянусь прийти</div>

								<el-form-item>
									<el-checkbox v-model="form.iWillGoToZags1" label="В ЗАГС на церемонию"/>
								</el-form-item>

								<el-form-item>
									<el-checkbox v-model="form.iWillGoToParty1" label="На фуршет"/>
								</el-form-item>

								<div v-if="form.guest2" class="mt-8">
									<div class="mb-3">Я, {{ form.guest2 }}, торжественно клянусь прийти</div>

									<el-form-item>
										<el-checkbox v-model="form.iWillGoToZags2" label="В ЗАГС на церемонию"/>
									</el-form-item>

									<el-form-item>
										<el-checkbox v-model="form.iWillGoToParty2" label="На фуршет"/>
									</el-form-item>
								</div>

								<el-button
									type="primary"
									class="mt-6"
									:loading="isSending"
									@click="iWillCome"
								>Клац!</el-button>
							</el-form>
						</div>
					</template>
				</el-card>
			</div>
		</div>

		<div class="d-flex justify-content-center py-8">
			<div>❤️ Сделано Ромой и Сашей, с любовью ❤️</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Layout',
	components: {
		MyDoodle: () => import('./MyDoodle'),
	},
	data() {
		return {
			isSending: false,
			isSend: JSON.parse(localStorage.getItem('isSend')),
			form: {
				guest1: (new URLSearchParams(window.location.search)).get('guest1'),
				iWillGoToZags1: false,
				iWillGoToParty1: false,
				guest2: (new URLSearchParams(window.location.search)).get('guest2'),
				iWillGoToZags2: false,
				iWillGoToParty2: false,
			},
			colors: [
				'#321730',
				'#4e2b4b',
				'#8a5689',
				'#dadbbb',
				'#a5a681',
				'#969495',
				'#373940',
				'#2f1e0a',
				'#0e0e13',
				'#e9f0c0',
				'#dcd294',
				'#aec55d',
				'#96af4c',
				'#739c3e',
				'#686573',
				'#71879a',
				'#b1c5d4',
				'#d6d7dc',
				'#d8b9aa',
				'#e4bcbc',
				'#e7ceb4',
				'#b4856e',
			],
		}
	},
	computed: {
		/* isDisabled() {
			if (this.form.guest2) {
				return !(this.form.iWillGoToZags1 || this.form.iWillGoToParty1) || !(this.form.iWillGoToZags2 || this.form.iWillGoToParty2)
			}

			return !(this.form.iWillGoToZags1 || this.form.iWillGoToParty1)
		}, */
	},
	methods: {
		async iWillCome() {
			try {
				this.isSending = true
				let text = ''

				if (this.form.guest1) {
					text += `Привет! Это ${this.form.guest1} в ЗАГС ${this.form.iWillGoToZags1 ? 'приду' : 'НЕ приду'}, на фуршет ${this.form.iWillGoToParty1 ? 'приду' : 'НЕ приду'}.`
				}

				if (this.form.guest2) {
					text += ` И ${this.form.guest2} в ЗАГС ${this.form.iWillGoToZags2 ? 'приду' : 'НЕ приду'}, на фуршет ${this.form.iWillGoToParty2 ? 'приду' : 'НЕ приду'}.`
				}

				await fetch('https://mailer.api.coding-cats.com/x-send-mail', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ text }),
				})

				this.isSend = true
				localStorage.setItem('isSend', this.isSend)
			} catch (error) {
				console.dir(error) // eslint-disable-line no-console
			} finally {
				this.isSending = false
			}
		},
	},
}
</script>

<style lang="scss">
@import 'ScssVariables';

body {
	font-size: 14px;
	overflow-y: overlay !important;
}

hr {
	border-width: 0;
	height: 2px;
	background-color: $--color-text-placeholder;
}

#intro {
	background-image: url('~Images/1-intro.jpg');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}

.blurry {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	filter: blur(10px) brightness(1.4);
	background-image: url('~Images/1-intro.jpg');
	background-position: center;
}

.text-size-1 {
	font-size: 4rem;

	@media screen and (max-width: 700px) {
		font-size: 1.8rem;
	}
}

.text-size-2 {
	font-size: 3rem;
}

.text-size-3 {
	font-size: 2rem;

	@media screen and (max-width: 700px) {
		font-size: 1.4rem;
	}
}

.text-size-4 {
	font-size: 1.5rem;
}

.el-form {
	.el-form-item {
		margin-bottom: 0;
	}
}
</style>