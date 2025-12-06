/**
 * 网关管理相关类型定义
 */

// 通用响应类型
export interface OperationResult<T> {
	code: number;
	msg: string;
	data: T;
}

export interface Result<T> {
	code: number;
	msg: string;
	data: T;
}

// 分页请求
export interface PageRequest {
	page: string;
	limit: string;
}

// 分页响应
export interface PageData<T> {
	list: T[];
	total: number;
}

// 网关服务数据
export interface GatewayServerDataVO {
	groupId: string;
	gatewayId: string;
	gatewayName: string;
	gatewayAddress: string;
	status?: string;
	createTime?: string;
	updateTime?: string;
}

// 网关服务详情数据
export interface GatewayServerDetailDatalVO {
	groupId: string;
	gatewayId?: string;
	detailId?: string;
	gatewayName?: string;
	gatewayAddress?: string;
	status?: string;
}

// 网关分配数据
export interface GatewayDistributionDataVO {
	groupId?: string;
	gatewayId?: string;
	systemId?: string;
	distributionId?: string;
}

// 应用系统数据
export interface ApplicationSystemDataVO {
	systemId?: string;
	systemName?: string;
	systemType?: string;
	systemRegistry?: string;
}

// 应用接口数据
export interface ApplicationInterfaceDataVO {
	systemId?: string;
	interfaceId?: string;
	interfaceName?: string;
	interfaceVersion?: string;
}

// 应用接口方法数据
export interface ApplicationInterfaceMethodDataVO {
	systemId?: string;
	interfaceId?: string;
	methodId?: string;
	methodName?: string;
	parameterType?: string;
	uri?: string;
	httpCommandType?: string;
	auth?: number;
}

// 网关服务配置 VO
export interface GatewayServerVO {
	groupId: string;
	gatewayId: string;
	gatewayName: string;
	gatewayAddress: string;
}

// 网关算力节点配置 VO
export interface GatewayServerDetailVO {
	groupId: string;
	gatewayId: string;
	gatewayName: string;
	gatewayAddress: string;
	detailId?: string;
}

// 网关分配配置 VO
export interface GatewayDistributionVO {
	groupId: string;
	gatewayId: string;
	systemId: string;
	distributionId?: string;
}

// 应用系统配置 VO
export interface ApplicationSystemVO {
	systemId: string;
	systemName: string;
	systemType: string;
	systemRegistry: string;
}

// 应用接口配置 VO
export interface ApplicationInterfaceVO {
	systemId: string;
	interfaceId: string;
	interfaceName: string;
	interfaceVersion: string;
}

// 应用接口方法配置 VO
export interface ApplicationInterfaceMethodVO {
	systemId: string;
	interfaceId: string;
	methodId: string;
	methodName: string;
	parameterType: string;
	uri: string;
	httpCommandType: string;
	auth: number;
}

// 应用系统富信息
export interface ApplicationSystemRichInfo {
	system: ApplicationSystemVO;
	interfaces: ApplicationInterfaceVO[];
	methods: ApplicationInterfaceMethodVO[];
}

// Nginx 配置
export interface LocationVO {
	path: string;
	proxyPass: string;
}

export interface UpstreamVO {
	name: string;
	loadBalance: string;
	servers: string[];
}

export interface NginxConfig {
	upstreams: UpstreamVO[];
	locations: LocationVO[];
}

// Redis 配置
export interface RedisConfig {
	[key: string]: string;
}

