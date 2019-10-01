import { BottomNavigation, BottomNavigationAction, Container } from '@material-ui/core'
import { CalendarToday, ChatBubble, Info } from '@material-ui/icons'
import { useLocale } from 'locales'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'

const Content = styled(Container)`
	margin-top: 20px;
	height: calc(var(--visible-height, 1vh) * 100 - 76px);
`

const Login: React.FC = () => {
	const [current, setCurrent] = useState(0)
	const { NEWS, MESSAGES, CALENDAR } = useLocale()

	return (
		<>
			<SwipeableViews index={current} onChangeIndex={i => setCurrent(i)}>
				<Content>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis minus necessitatibus
					mollitia tenetur placeat commodi, ratione odio harum rerum dolor. Vel eius illum
					laboriosam obcaecati ducimus non voluptate nobis tenetur in veritatis, ut quae voluptates
					reprehenderit molestiae atque natus molestias dolore. Id recusandae corporis culpa quae
					necessitatibus debitis. Beatae facere dolorum quam optio fugiat praesentium, quidem
					deleniti deserunt dignissimos voluptatum? Ducimus minus aliquid, est non possimus
					reprehenderit. Dolor temporibus quod voluptatem iusto eveniet, rerum nostrum tempore eum
					dolorem aspernatur accusantium a maiores error modi nemo repellendus non rem labore!
					Dolorum repudiandae mollitia excepturi, doloremque, fuga dolore corporis architecto
					voluptas asperiores hic recusandae optio earum dignissimos tempora nesciunt. Maiores
					reiciendis laborum voluptatum pariatur, nisi, eum provident quod labore iste dolore omnis
					deleniti! Nostrum itaque iusto doloribus vel nesciunt beatae veritatis nihil perspiciatis.
					Enim, harum. Ipsa nisi dolorum id, sunt ea optio totam adipisci quae a, ipsum atque
					quisquam inventore officia minus soluta, commodi harum vel eligendi. Unde impedit, qui
					deleniti possimus pariatur at itaque commodi obcaecati! Commodi, nihil. Et nesciunt magnam
					provident ad commodi tempora vel rerum nihil, velit natus? Incidunt, reprehenderit
					adipisci repellat nisi numquam accusamus repudiandae totam nostrum iure perspiciatis eius
					voluptates blanditiis, tempora deserunt vero omnis debitis fuga.
				</Content>
				<Content>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. At sapiente quaerat qui ad.
					Repudiandae eius necessitatibus enim ipsa nam soluta praesentium dolore consectetur
					deleniti. Reprehenderit, est. Reiciendis consequatur omnis quisquam consequuntur
					asperiores ipsum nisi harum in atque culpa commodi, totam aliquam odit dicta excepturi
					cumque dignissimos perspiciatis mollitia maxime labore at voluptatibus eos inventore!
					Laborum, tempora? Totam at repellendus architecto nihil iusto non et commodi facere vero,
					expedita porro? Aliquid error pariatur quas qui iste eligendi suscipit, tempore a. Saepe
					consequuntur incidunt at sunt ipsum eius quam itaque et quos ducimus, quibusdam sapiente
					vitae provident excepturi, adipisci quo. Dolorum necessitatibus ea odit vero autem, illum
					adipisci asperiores aspernatur sint, rerum modi veritatis praesentium molestias dicta
					facere! Iusto, id est quam iure a accusantium consequuntur quis tempora dolore non eaque
					dicta numquam voluptatem, itaque nihil quo corrupti architecto quidem. Cupiditate
					provident modi, possimus a tempore voluptatibus esse laudantium assumenda eveniet cum
					iusto unde doloremque saepe doloribus, aperiam amet blanditiis distinctio fugit. Unde
					ipsum eos eligendi repellendus? Ducimus unde nemo delectus possimus quibusdam! Omnis illo
					aliquid esse quos laudantium non, labore, error dicta deleniti repellendus voluptates,
					quod nihil nulla autem dolor laboriosam. Sunt iusto possimus fugit eos facilis, eaque,
					odit eius quo hic nostrum dolor tempore cupiditate nihil recusandae alias provident
					expedita nulla, ea dolores id. Sapiente repellendus ab quia in illo, consectetur minus
					magnam eius? Deserunt architecto eius alias enim, vitae quis corrupti illo quos
					necessitatibus sunt nam est doloremque? Dignissimos illum debitis ducimus vero minima nam
					dolore aliquid in mollitia excepturi, distinctio itaque, consequuntur numquam atque quam
					quo? Ratione quas perferendis officiis, id sunt deserunt unde voluptatum esse in eum culpa
					recusandae atque eveniet. Cupiditate, facere, nihil blanditiis ea alias autem illum libero
					corporis est hic explicabo sunt perferendis voluptates ipsa asperiores quibusdam, quam
					aperiam quasi quo numquam. Voluptatum itaque, porro sapiente cum ullam asperiores
					voluptatibus nesciunt ad aut non recusandae doloremque maiores provident illo praesentium
					necessitatibus? Veritatis tempora commodi exercitationem. Error esse rem vel, nemo quae
					praesentium necessitatibus reprehenderit! Ex explicabo suscipit, unde quibusdam optio
					tenetur nemo sint architecto nisi doloremque ducimus rerum veniam ad sequi modi vel dolore
					harum atque eligendi labore? Delectus voluptate, et consectetur tempore tenetur culpa
					provident nesciunt nostrum neque harum molestias amet minima ipsum error, nulla deleniti
					dolorem minus blanditiis veritatis, eaque quisquam repudiandae! Corrupti dolor assumenda,
					voluptate dolorum blanditiis necessitatibus enim cupiditate quae minus earum libero quis
					beatae, iure deleniti sapiente. Tempora eveniet dolores numquam quae assumenda doloremque.
					Vero quod rem veniam cupiditate repellendus quisquam numquam odit fugit consequuntur sint,
					impedit aliquid maiores earum tempore porro voluptatibus tempora possimus exercitationem
					atque expedita reiciendis aperiam architecto eligendi nemo! Ullam consectetur quo quod ad
					reiciendis culpa asperiores nobis facilis sapiente animi, voluptas fugit. Dolor optio
					ratione rerum incidunt enim corrupti veritatis eos repellendus nemo voluptatem. Cum
					laborum sint, assumenda quo adipisci debitis. Odio, aut ad ipsam dolore recusandae modi
					officiis dolorem minus quos cum, atque, nihil sapiente soluta commodi animi perspiciatis
					dolores corrupti est inventore aspernatur voluptatum maxime tempora nesciunt nobis.
					Nesciunt accusantium cum error harum, modi nisi aperiam facere repudiandae excepturi esse
					ratione ab ea praesentium aliquam quasi temporibus commodi eligendi laboriosam ducimus hic
					omnis molestias earum eum. Corporis quae fugit libero aspernatur. Facilis temporibus,
					aspernatur velit architecto eos in earum cum neque a animi doloribus praesentium. Quod
					expedita debitis molestiae sapiente illum qui dignissimos cum cumque quae ipsam tempora
					voluptas dolore veritatis rerum necessitatibus repellendus aliquid, quisquam deserunt
					labore laudantium quasi nostrum tempore ex quas! Cum quis expedita itaque earum repellat
					nobis quibusdam. Repudiandae quo asperiores iste consectetur debitis sed rerum, quos
					quisquam necessitatibus at voluptate qui aut enim repellat delectus eum id dignissimos
					veniam maiores, officia quod nobis velit nemo animi. Sit, expedita perferendis ullam cum
					possimus sint accusamus ab harum molestias fuga. Doloremque quas qui reprehenderit ut iste
					illum nobis, dolorum molestias nostrum eligendi sit, consequatur aliquam recusandae sed
					molestiae corrupti cupiditate. Dolore dolor libero eum soluta non fugiat dolorum qui magni
					placeat ea fuga, delectus maiores eaque. Vero deleniti officiis natus totam facere sit
					voluptate iste eius possimus, qui at inventore assumenda expedita. Quasi eius at quam?
					Aperiam modi iusto ea sint quis? At quod nisi tempora maiores quam nam fugit facilis
					eligendi id veniam. Voluptas tempore placeat, accusamus laboriosam provident, illo maiores
					magnam libero necessitatibus aliquam omnis perspiciatis earum dolorum ducimus odio
					molestiae hic deserunt? Doloribus dignissimos alias ducimus dolore reiciendis eius vero
					velit, harum reprehenderit et. Adipisci ex ut, modi harum, laudantium deleniti tempora
					excepturi qui libero ratione sunt iusto aperiam cupiditate facilis consequuntur,
					voluptatibus distinctio molestias dignissimos provident incidunt eum quis nulla! Similique
					nisi optio alias mollitia fugiat itaque consectetur reiciendis qui dicta molestiae esse
					recusandae, perferendis quasi incidunt praesentium temporibus hic id nobis quos laboriosam
					ad tempora neque dolores? Architecto dolorum minus id commodi quas molestiae ad
					perferendis ut aspernatur iste. Error, quod aperiam. Culpa quae facere quas cupiditate,
					autem voluptatibus reiciendis unde, laudantium, dolorum ab minus voluptatum veritatis
					totam. Quibusdam nam neque soluta sed explicabo non debitis similique accusantium,
					deleniti nisi, molestiae minima ad ex. Dolorum qui laudantium necessitatibus quisquam
					quasi, recusandae placeat libero perspiciatis sint molestias ullam assumenda quas minus
					cum at a ipsam ipsum numquam! Sed natus odio dicta doloremque blanditiis illum maxime eos?
					Laboriosam quam totam laudantium esse, voluptatum alias dicta odit deserunt reprehenderit
					possimus doloribus? Quam, quisquam optio quis temporibus possimus, odit quos, nihil
					deserunt veniam numquam obcaecati inventore nam est necessitatibus nulla corrupti! Ipsam,
					sunt saepe. Veritatis unde incidunt minus error accusamus iste alias eum aperiam odit?
					Soluta similique, ipsam illo eaque vero amet et exercitationem nobis! Aliquam, enim
					impedit quibusdam, modi odit sapiente cupiditate facilis nisi dolor fugit deleniti quia
					vero eveniet? Exercitationem sunt, repellat culpa molestiae saepe unde, quam veniam eaque
					consequatur nulla ad. Blanditiis, veritatis laboriosam? Totam sunt ducimus quibusdam
					aliquid repellendus reprehenderit nemo eius perferendis culpa doloremque accusamus,
					excepturi at est beatae. Quasi non iure dolores deserunt ratione, enim rerum ipsum sint
					consectetur, ducimus a minus eos perferendis temporibus debitis minima odit asperiores?
					Numquam, aliquid nesciunt qui repellat sint libero praesentium tempore eos quis cumque
					voluptate? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio atque quo
					commodi repellendus explicabo soluta dolorem eos aperiam quasi minus sint odio debitis
					omnis enim quisquam quas culpa sapiente, autem accusamus dolorum quia veniam fugit. Cumque
					autem expedita commodi necessitatibus repellat blanditiis harum repellendus eveniet, eum
					illum omnis magnam, ipsa ducimus voluptas impedit praesentium dolores dolor provident
					ullam exercitationem distinctio veritatis magni. Asperiores voluptate libero temporibus
					facilis inventore, error saepe cumque velit dolore sit distinctio eos facere, soluta
					sequi, recusandae commodi magnam harum. Impedit omnis labore quisquam. Ratione fugiat
					necessitatibus hic totam sint cupiditate officia. Labore, a quos inventore aperiam
					excepturi quo dignissimos alias enim corrupti libero, distinctio officiis laborum placeat
					assumenda voluptates adipisci, expedita voluptatem voluptas commodi iste consequatur
					architecto. Impedit quo fugiat, expedita debitis placeat molestias, saepe fuga architecto
					sapiente sint minus quos. Dolores, dolorum molestiae. Praesentium dolorum consequatur,
					accusantium voluptas sed sit deserunt esse ipsam quisquam, aperiam eum reiciendis. Sit
					quidem aut iure blanditiis odit numquam, possimus labore illum quaerat maxime voluptatum
					tempora ab excepturi rem vero odio beatae laboriosam temporibus quos accusantium, soluta
					ipsam nihil voluptates veniam? Molestiae voluptatibus eligendi, rem, facilis, accusamus
					atque ducimus beatae commodi a nemo iure eos placeat praesentium tempore in natus!
				</Content>
				<Content>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum tempore at, ipsa esse
					consequuntur maxime vero velit distinctio delectus assumenda placeat commodi similique,
					dignissimos ducimus soluta molestiae aspernatur magni voluptatem nisi modi, illum numquam.
					Rerum soluta quae expedita ipsam quibusdam! At laudantium non beatae facere accusantium
					quo omnis itaque hic, enim in provident dolorem veritatis? In harum veniam iste
					consequuntur possimus. Nulla, similique voluptas expedita quis voluptate necessitatibus
					facilis aut ab asperiores molestiae vel magni illo deleniti sed repellendus officiis
					dignissimos provident! Magnam adipisci totam sunt debitis ipsa asperiores fugiat saepe
					optio necessitatibus eveniet esse possimus, doloribus et. Obcaecati, maiores sint minus
					possimus debitis dolorum distinctio. Dolor sit ut labore aut ea sapiente et perspiciatis
					obcaecati ad praesentium aliquid repellendus facilis, beatae cupiditate aspernatur
					molestiae possimus adipisci laborum eum magnam dignissimos ratione nobis excepturi. Fugit
					aut sequi rerum voluptas! Cumque similique accusamus saepe, blanditiis odio ipsam
					accusantium eum. Tenetur saepe architecto voluptas totam suscipit ut nemo accusamus,
					eaque, facere asperiores dolor. Nostrum voluptate aut reprehenderit animi? Facere amet
					dignissimos ducimus necessitatibus qui, itaque ex soluta quam aspernatur non a nihil
					veritatis accusantium corrupti maiores dolorum animi eos est totam odio porro? Hic dolorum
					id blanditiis soluta sequi obcaecati alias qui.
				</Content>
			</SwipeableViews>
			<BottomNavigation value={current} onChange={(_, newValue) => setCurrent(newValue)} showLabels>
				<BottomNavigationAction label={NEWS} icon={<Info />} />
				<BottomNavigationAction label={MESSAGES} icon={<ChatBubble />} />
				<BottomNavigationAction label={CALENDAR} icon={<CalendarToday />} />
			</BottomNavigation>
		</>
	)
}

export default Login
