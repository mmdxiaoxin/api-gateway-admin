import { get, post, put } from "../api";
import type {
	OperationResult,
	Result,
	GatewayServerDataVO,
	GatewayServerDetailDatalVO,
	GatewayDistributionDataVO,
	ApplicationSystemDataVO,
	ApplicationInterfaceDataVO,
	ApplicationInterfaceMethodDataVO,
	GatewayServerVO,
	GatewayServerDetailVO,
	GatewayDistributionVO,
	ApplicationSystemVO,
	ApplicationInterfaceVO,
	ApplicationInterfaceMethodVO,
	ApplicationSystemRichInfo,
	RedisConfig,
} from "@/types/gateway";

/**
 * 数据操作管理 API
 */

// 查询网关服务数据
export async function queryGatewayServer(
	groupId: string,
	page: string,
	limit: string
): Promise<OperationResult<GatewayServerDataVO>> {
	const response = await get<OperationResult<GatewayServerDataVO>>(
		"/api/v1/gateway-servers",
		{
			params: { groupId, page, limit },
		}
	);
	// 后端直接返回 OperationResult，response.data 就是 OperationResult
	return response.data as OperationResult<GatewayServerDataVO>;
}

// 查询网关服务详情数据
export async function queryGatewayServerDetail(
	groupId: string,
	page: string,
	limit: string,
	gatewayId?: string
): Promise<OperationResult<GatewayServerDetailDatalVO>> {
	const response = await get<OperationResult<GatewayServerDetailDatalVO>>(
		"/api/v1/gateway-servers/details",
		{
			params: { groupId, gatewayId, page, limit },
		}
	);
	return response.data as OperationResult<GatewayServerDetailDatalVO>;
}

// 查询网关分配数据
export async function queryGatewayDistribution(
	page: string,
	limit: string,
	groupId?: string,
	gatewayId?: string
): Promise<OperationResult<GatewayDistributionDataVO>> {
	const response = await get<OperationResult<GatewayDistributionDataVO>>(
		"/api/v1/gateway-servers/distributions",
		{
			params: { groupId, gatewayId, page, limit },
		}
	);
	return response.data as OperationResult<GatewayDistributionDataVO>;
}

// 查询应用系统信息
export async function queryApplicationSystem(
	page: string,
	limit: string,
	systemId?: string,
	systemName?: string
): Promise<OperationResult<ApplicationSystemDataVO>> {
	const response = await get<OperationResult<ApplicationSystemDataVO>>(
		"/api/v1/gateway-servers/application-systems",
		{
			params: { systemId, systemName, page, limit },
		}
	);
	return response.data as OperationResult<ApplicationSystemDataVO>;
}

// 查询应用接口信息
export async function queryApplicationInterface(
	page: string,
	limit: string,
	systemId?: string,
	interfaceId?: string
): Promise<OperationResult<ApplicationInterfaceDataVO>> {
	const response = await get<OperationResult<ApplicationInterfaceDataVO>>(
		"/api/v1/gateway-servers/application-interfaces",
		{
			params: { systemId, interfaceId, page, limit },
		}
	);
	return response.data as OperationResult<ApplicationInterfaceDataVO>;
}

// 查询应用接口方法信息
export async function queryApplicationInterfaceMethod(
	page: string,
	limit: string,
	systemId?: string,
	interfaceId?: string
): Promise<OperationResult<ApplicationInterfaceMethodDataVO>> {
	const response = await get<OperationResult<ApplicationInterfaceMethodDataVO>>(
		"/api/v1/gateway-servers/application-interfaces/methods",
		{
			params: { systemId, interfaceId, page, limit },
		}
	);
	return response.data as OperationResult<ApplicationInterfaceMethodDataVO>;
}

/**
 * 网关配置管理 API
 */

// 查询网关服务配置项
export async function queryServerConfig(): Promise<Result<GatewayServerVO[]>> {
	const response = await get<Result<GatewayServerVO[]>>(
		"/api/v1/config/gateway-servers"
	);
	return response.data as Result<GatewayServerVO[]>;
}

// 查询网关算力节点配置项
export async function queryServerDetailConfig(): Promise<Result<GatewayServerDetailVO[]>> {
	const response = await get<Result<GatewayServerDetailVO[]>>(
		"/api/v1/config/gateway-server-details"
	);
	return response.data as Result<GatewayServerDetailVO[]>;
}

// 查询网关分配配置项
export async function queryGatewayDistributionList(): Promise<Result<GatewayDistributionVO[]>> {
	const response = await get<Result<GatewayDistributionVO[]>>(
		"/api/v1/config/gateway-distributions"
	);
	return response.data as Result<GatewayDistributionVO[]>;
}

// 注册网关服务节点
export async function registerGatewayServerNode(
	groupId: string,
	gatewayId: string,
	gatewayName: string,
	gatewayAddress: string
): Promise<Result<boolean>> {
	const response = await post<Result<boolean>>(
		"/api/v1/config/gateway-servers",
		null,
		{
			params: { groupId, gatewayId, gatewayName, gatewayAddress },
		}
	);
	return response.data as Result<boolean>;
}

// 网关算力与系统挂载配置
export async function distributionGatewayServerNode(
	groupId: string,
	gatewayId: string,
	systemId: string
): Promise<Result<boolean>> {
	const response = await post<Result<boolean>>(
		"/api/v1/config/gateway-distributions",
		null,
		{
			params: { groupId, gatewayId, systemId },
		}
	);
	return response.data as Result<boolean>;
}

// 查询应用服务配置项
export async function queryApplicationSystemList(): Promise<Result<ApplicationSystemVO[]>> {
	const response = await get<Result<ApplicationSystemVO[]>>(
		"/api/v1/config/application-systems"
	);
	return response.data as Result<ApplicationSystemVO[]>;
}

// 查询应用接口配置项
export async function queryApplicationInterfaceList(): Promise<Result<ApplicationInterfaceVO[]>> {
	const response = await get<Result<ApplicationInterfaceVO[]>>(
		"/api/v1/config/application-interfaces"
	);
	return response.data as Result<ApplicationInterfaceVO[]>;
}

// 查询应用接口方法配置项
export async function queryApplicationInterfaceMethodList(): Promise<Result<ApplicationInterfaceMethodVO[]>> {
	const response = await get<Result<ApplicationInterfaceMethodVO[]>>(
		"/api/v1/config/application-interface-methods"
	);
	return response.data as Result<ApplicationInterfaceMethodVO[]>;
}

// 查询分配到网关下的待注册系统信息
export async function queryApplicationSystemRichInfo(
	gatewayId: string,
	systemId: string
): Promise<Result<ApplicationSystemRichInfo>> {
	const response = await get<Result<ApplicationSystemRichInfo>>(
		"/api/v1/config/application-systems/rich-info",
		{
			params: { gatewayId, systemId },
		}
	);
	return response.data as Result<ApplicationSystemRichInfo>;
}

// 查询配置中心Redis配置信息
export async function queryRedisConfig(): Promise<Result<RedisConfig>> {
	const response = await get<Result<RedisConfig>>(
		"/api/v1/config/redis-config"
	);
	return response.data as Result<RedisConfig>;
}

/**
 * 负载均衡管理 API
 */

// 复制Nginx配置文件
export async function copyNginxConfig(): Promise<void> {
	await post("/api/v1/load-balancing/nginx-config/copy");
}

// 更新Nginx配置
export async function updateNginxConfig(config: {
	upstreams: Array<{ name: string; loadBalance: string; servers: string[] }>;
	locations: Array<{ path: string; proxyPass: string }>;
}): Promise<void> {
	await put("/api/v1/load-balancing/nginx-config", config);
}

/**
 * RPC 服务注册管理 API
 */

// 注册应用服务
export async function registerApplication(
	systemId: string,
	systemName: string,
	systemType: string,
	systemRegistry: string
): Promise<Result<boolean>> {
	const response = await post<Result<boolean>>(
		"/api/v1/register/applications",
		null,
		{
			params: { systemId, systemName, systemType, systemRegistry },
		}
	);
	return response.data as Result<boolean>;
}

// 注册应用接口
export async function registerApplicationInterface(
	systemId: string,
	interfaceId: string,
	interfaceName: string,
	interfaceVersion: string
): Promise<Result<boolean>> {
	const response = await post<Result<boolean>>(
		"/api/v1/register/application-interfaces",
		null,
		{
			params: { systemId, interfaceId, interfaceName, interfaceVersion },
		}
	);
	return response.data as Result<boolean>;
}

// 注册应用接口方法
export async function registerApplicationInterfaceMethod(
	systemId: string,
	interfaceId: string,
	methodId: string,
	methodName: string,
	parameterType: string,
	uri: string,
	httpCommandType: string,
	auth: number
): Promise<Result<boolean>> {
	const response = await post<Result<boolean>>(
		"/api/v1/register/application-interface-methods",
		null,
		{
			params: {
				systemId,
				interfaceId,
				methodId,
				methodName,
				parameterType,
				uri,
				httpCommandType,
				auth,
			},
		}
	);
	return response.data as Result<boolean>;
}

// 应用信息注册完成通知
export async function registerEvent(systemId: string): Promise<Result<boolean>> {
	const response = await post<Result<boolean>>(
		"/api/v1/register/events",
		null,
		{
			params: { systemId },
		}
	);
	return response.data as Result<boolean>;
}

